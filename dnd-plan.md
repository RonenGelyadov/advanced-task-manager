# הוספת Drag & Drop של משימות בין עמודות (BoardPage)

## Context

היום ההעברה של משימה בין עמודות אפשרית רק דרך תפריט 3 הנקודות בכרטיס → "Move to column" → בחירת עמודה מרשימה. זה עובד, אבל זו לא חוויית קאנבן אמיתית.

המטרה: לאפשר גרירה של כרטיס משימה מעמודה אחת לשנייה בתוך `BoardPage`, עם משוב ויזואלי ברור — ידית גרירה ייעודית בכרטיס, כרטיס מרחף מעוצב, והדגשה של העמודה שמתחתיה משחררים.

**החלטות שסוכמו:**
- ספרייה: `@dnd-kit/core`
- היקף: גרירה **בין עמודות בלבד** (לא סידור מחדש בתוך עמודה) — לכן אין שינוי סכמה ב-Firestore
- עדכון **אופטימי**: הכרטיס עובר עמודה מיד, ואם הכתיבה ל-Firestore נכשלת הוא חוזר למקומו

**נקודת מוצא מצוינת:** `taskStore.moveTask(taskId, columnId)` כבר קיים ועושה בדיוק את מה שצריך — לא צריך לוגיקה חדשה, רק לחבר אליו את ה-drop ולהפוך אותו לאופטימי.

---

## שלב 0 — התקנת החבילה

```bash
npm install @dnd-kit/core
```

רק `@dnd-kit/core`. **לא** צריך `@dnd-kit/sortable` — הוא נועד לסידור מחדש בתוך רשימה, וזה מחוץ להיקף.

---

## שלב 1 — `src/store/taskStore.ts`: להפוך את `moveTask` לאופטימי

כרגע `moveTask` קורא ל-`get().updateTask()`, שכותב ל-Firestore ורק אחר כך מעדכן את ה-state. בגרירה זה מרגיש שבור: משחררים את הכרטיס והוא נשאר בעמודה הישנה עוד חצי שנייה.

השינוי: לעדכן את ה-state **מיד**, לכתוב ל-Firestore ברקע, ואם נכשל — להחזיר את הערך הקודם.

```ts
moveTask: async (taskId, columnId) => {
  const foundTask = get().tasks.find((t) => t.id === taskId);
  if (!foundTask || foundTask.columnId === columnId) return;

  const movedTask = { ...foundTask, columnId };

  // Optimistic: move the card locally first so the drop feels instant.
  set({ tasks: get().tasks.map((t) => (t.id === taskId ? movedTask : t)) });

  try {
    await updateTask(movedTask);
  } catch (error) {
    // Rollback to the previous column if the write failed.
    set({ tasks: get().tasks.map((t) => (t.id === taskId ? foundTask : t)) });
    throw error;
  }
},
```

הערות:
- `updateTask` (שירות Firestore) כבר מיובא בראש הקובץ — קוראים לו ישירות ולא דרך `get().updateTask`, כדי לא לעשות `set` פעמיים.
- **לא** להפעיל את `useLoadingStore` כאן. `BoardPage` עושה `if (isLoading) return;` ומוחק את כל המסך — זה יגרום להבהוב בכל גרירה.
- ההגנה `foundTask.columnId === columnId` חוסכת כתיבה מיותרת כשמשחררים על אותה עמודה.
- שינוי זה משפר גם את התפריט הקיים "Move to column", שמשתמש באותה פונקציה.

---

## שלב 2 — `src/components/TaskCard.tsx`: ידית גרירה + מצבי תצוגה

`TaskCard` נשאר אחראי על **המראה** בלבד; הוא לא מכיר את dnd-kit. הוא מקבל 3 props אופציונליים חדשים:

```ts
interface TaskCardProps {
  task: Task;
  dragHandleProps?: React.HTMLAttributes<HTMLElement>; // listeners + attributes מ-useDraggable
  isDragging?: boolean;  // הכרטיס המקורי, בזמן שהעותק המרחף נגרר
  isOverlay?: boolean;   // הכרטיס המרחף עצמו (בתוך DragOverlay)
}
```

### 2.1 ידית הגרירה

לפי הבקשה — כפתור אייקון שמופיע ב-hover ליד כפתור השמירה ותפריט 3 הנקודות. הוא נכנס לתוך ה-`Box` עם `className="task-actions"` (שורות 115‑145), **ראשון ברשימה** (משמאל לסימנייה):

```tsx
<Tooltip title="Drag to another column">
  <IconButton
    size="small"
    disableRipple
    {...dragHandleProps}
    sx={{
      p: 0.5,
      color: 'text.secondary',
      cursor: 'grab',
      touchAction: 'none',            // חובה ל-dnd-kit במגע
      '&:active': { cursor: 'grabbing' },
      '&:hover': { color: 'primary.main' },
    }}
  >
    <DragIndicatorIcon sx={{ fontSize: 20 }} />
  </IconButton>
</Tooltip>
```

- ייבוא: `import DragIndicatorIcon from '@mui/icons-material/DragIndicator';`
- ה-`Box` העוטף כבר עושה `onClick={(e) => e.stopPropagation()}` (שורה 123) — לכן גרירה/לחיצה על הידית **לא** תפעיל את הניווט ל-`ROUTES.TASK` שיושב על ה-`Card`. אין צורך לגעת ב-`onClick` של הכרטיס.
- `touchAction: 'none'` על **הידית בלבד** — אם נשים אותו על כל הכרטיס, אי אפשר יהיה לגלול את העמודה באצבע.

### 2.2 סגנון הכרטיס המקורי בזמן גרירה (`isDragging`)

העותק המרחף מוצג ב-`DragOverlay`, אז המקור צריך להיראות כמו "מקום פנוי":

```tsx
...(isDragging && {
  opacity: 0.35,
  border: '1px dashed',
  borderColor: 'primary.main',
  boxShadow: 'none',
  '&:hover': { transform: 'none' },   // לבטל את ה-hover הרגיל
}),
```

### 2.3 סגנון הכרטיס המרחף (`isOverlay`) — הדרישה העיצובית המרכזית

צריך להיות ברור מיד שהכרטיס "מורם מהלוח":

```tsx
...(isOverlay && {
  cursor: 'grabbing',
  transform: 'rotate(3deg) scale(1.03)',
  border: '2px solid',
  borderColor: 'primary.main',
  boxShadow: isDark
    ? '0 20px 45px rgba(0,0,0,0.65), 0 0 0 4px rgba(99,102,241,0.18)'
    : '0 20px 45px rgba(0,0,0,0.22), 0 0 0 4px rgba(99,102,241,0.15)',
  '&:hover': { transform: 'rotate(3deg) scale(1.03)' },  // לנטרל hover
  '& .task-actions': { opacity: 1 },  // הידית נשארת גלויה בזמן הגרירה
}),
```

בנוסף, כשה-`isOverlay` דלוק:
- **לבטל את ה-`onClick`** של ה-`Card` (`onClick={isOverlay ? undefined : () => navigate(...)}`) — אחרת שחרור מעל העותק ינווט.
- להסיר את `className="fade-in-up"` (אנימציית הכניסה תרוץ מחדש בכל גרירה ותיראה מוזר).

---

## שלב 3 — `src/components/DraggableTaskCard.tsx` (קובץ חדש)

עוטף קטן שמחזיק את הלוגיקה של dnd-kit ומשאיר את `TaskCard` נקי. **חשוב:** בזכות ההפרדה הזו, הכרטיס שב-`DragOverlay` הוא `TaskCard` רגיל שלא קורא ל-`useDraggable` — כך נמנעת התנגשות של שני draggables עם אותו `id`.

```tsx
const DraggableTaskCard = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
    data: { type: 'task', task },   // נקרא בחזרה ב-onDragStart/onDragEnd
  });

  return (
    <Box ref={setNodeRef}>
      <TaskCard
        task={task}
        isDragging={isDragging}
        dragHandleProps={{ ...listeners, ...attributes }}
      />
    </Box>
  );
};

export default memo(DraggableTaskCard);
```

הערות:
- לא מפעילים `transform` על המקור — כל התנועה הוויזואלית קורית ב-`DragOverlay`.
- `Box` עוטף במקום להעביר `ref` ל-`TaskCard` הממומו — פשוט וללא שאלות של ref forwarding.
- לפי מוסכמות הפרויקט: `export default memo(...)`, שם קובץ PascalCase, import יחסי, `import type` לטיפוסים.

---

## שלב 4 — `src/components/ColumnCard.tsx`: הפיכת העמודה ל-Droppable

ה-`Box` הפנימי שמכיל את המשימות (שורות 138‑176, זה עם `maxHeight: 'calc(100vh - 280px)'` ו-`overflow: 'auto'`) הופך לאזור השחרור:

```tsx
const { setNodeRef, isOver } = useDroppable({ id, data: { type: 'column' } });
```

- `ref={setNodeRef}` על אותו `Box`.
- להוסיף לו `minHeight: 120` כדי שגם עמודה ריקה תהיה יעד שחרור נוח.
- להחליף את `filteredTasks.map((task) => <TaskCard ... />)` ב-`<DraggableTaskCard key={task.id} task={task} />`.

**משוב ויזואלי כשגוררים מעל העמודה** (`isOver`), משתמש ב-`color` שכבר מגיע כ-prop של העמודה:

```tsx
...(isOver && {
  background: `${color}14`,
  border: `2px dashed ${color}`,
  transition: 'background 0.15s, border-color 0.15s',
}),
```

וב-placeholder של עמודה ריקה — להחליף את הטקסט ל-`'Drop here'` כש-`isOver` דלוק, במקום `'No tasks yet'`.

---

## שלב 5 — `src/pages/authPages/BoardPage.tsx`: `DndContext` + `DragOverlay`

זה המקום היחיד שבו גם `columns` וגם `tasks` נמצאים ב-scope, ולכן ה-context צריך לשבת כאן.

### 5.1 State וחיישנים

```tsx
const [activeTask, setActiveTask] = useState<Task | null>(null);
const moveTask = useTaskStore((s) => s.moveTask);

const sensors = useSensors(
  useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
);
```

`activationConstraint: { distance: 5 }` = הגרירה מתחילה רק אחרי 5px תנועה. זו רשת ביטחון שנייה נגד קליק בטעות (הראשונה היא ה-`stopPropagation` בשלב 2.1).

### 5.2 Handlers

```tsx
const handleDragStart = (event: DragStartEvent) => {
  setActiveTask((event.active.data.current?.task as Task) ?? null);
};

const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;
  setActiveTask(null);
  if (!over) return;

  const draggedTask = active.data.current?.task as Task | undefined;
  const targetColumnId = String(over.id);

  if (draggedTask && draggedTask.columnId !== targetColumnId) {
    moveTask(draggedTask.id, targetColumnId);
  }
};
```

בנוסף `onDragCancel={() => setActiveTask(null)}` (למשל לחיצה על Esc באמצע גרירה).

### 5.3 עטיפת רצועת העמודות

לעטוף את ה-`Box` של רצועת העמודות (שורות 166‑200) ב:

```tsx
<DndContext
  sensors={sensors}
  collisionDetection={pointerWithin}
  onDragStart={handleDragStart}
  onDragEnd={handleDragEnd}
  onDragCancel={() => setActiveTask(null)}
>
  {/* ה-Box הקיים עם ColumnCard-ים — ללא שינוי */}

  <DragOverlay dropAnimation={{ duration: 200, easing: 'cubic-bezier(0.2, 0, 0, 1)' }}>
    {activeTask && (
      <Box sx={{ width: 352 }}>   {/* רוחב העמודה (400) פחות ה-padding */}
        <TaskCard task={activeTask} isOverlay />
      </Box>
    )}
  </DragOverlay>
</DndContext>
```

- `pointerWithin` היא אסטרטגיית ה-collision הנכונה כשה-droppables הם מכלים גדולים (עמודות) — היא בודקת אם **הסמן** נמצא בתוך העמודה, ולא איפה מרכז הכרטיס נמצא. זה מרגיש הרבה יותר טבעי מ-`rectIntersection` כשהכרטיס גדול.
- העטיפה ב-`Box` עם רוחב קבוע נחוצה כי ה-`DragOverlay` מרונדר ב-portal מחוץ לעמודה, ובלעדיה הכרטיס יתמוטט לרוחב התוכן.
- ה-`ColumnDialog` נשאר איפה שהוא — הוא לא חלק מה-DnD.

---

## קבצים שמושפעים

| קובץ | שינוי |
|---|---|
| `package.json` | הוספת `@dnd-kit/core` |
| `src/store/taskStore.ts` | `moveTask` הופך לאופטימי עם rollback |
| `src/components/TaskCard.tsx` | props חדשים, ידית גרירה, סגנונות `isDragging`/`isOverlay` |
| `src/components/DraggableTaskCard.tsx` | **חדש** — עוטף `useDraggable` |
| `src/components/ColumnCard.tsx` | `useDroppable` על מכל המשימות + הדגשת `isOver` |
| `src/pages/authPages/BoardPage.tsx` | `DndContext`, `DragOverlay`, sensors, handlers |

---

## בדיקה

1. `npm install @dnd-kit/core`
2. `npm run dev` → להיכנס ללוח עם לפחות 2 עמודות ומשימה אחת.
3. **גרירה בסיסית:** hover על כרטיס → מופיעות 3 ידיות (גרירה, סימנייה, 3 נקודות). לגרור מהידית לעמודה אחרת → הכרטיס נוחת שם **מיד**.
4. **עיצוב:** בזמן הגרירה — הכרטיס המרחף מוטה, מוגדל, עם מסגרת סגולה וצל חזק; המקור דהוי עם מסגרת מקווקוות; העמודה שמתחת מקבלת רקע וגבול מקווקו בצבע שלה.
5. **אין ניווט בטעות:** לחיצה על גוף הכרטיס עדיין מנווטת לעמוד המשימה; לחיצה/גרירה על הידית — לא.
6. **עמודה ריקה:** לגרור לעמודה בלי משימות → הטקסט משתנה ל-"Drop here" והשחרור עובד.
7. **התמדה:** רענון הדף (F5) → המשימה נשארת בעמודה החדשה (הכתיבה ל-Firestore הצליחה).
8. **ביטול:** להתחיל גרירה, ללחוץ Esc או לשחרר מחוץ לכל עמודה → הכרטיס חוזר, אין קריאת רשת.
9. **פילטרים:** לעבור ל-"My Tasks"/"Saved" ולגרור → עדיין עובד.
10. `npm run build` — לוודא שאין שגיאות TypeScript (`noUnusedLocals`/`noUnusedParameters` דלוקים, אז ייבוא לא בשימוש שובר את הבילד).

---

## הערות והגבלות ידועות

- **סידור בתוך עמודה:** מחוץ להיקף. אחרי הגרירה המשימה שומרת על מיקומה במערך הגלובלי, כלומר היא לא בהכרח תופיע בסוף העמודה החדשה. כדי לשלוט בזה צריך שדה `order` על `Task` — שינוי סכמה.
- **`flexWrap: 'wrap'` על רצועת העמודות:** כרגע עמודות "נשברות" לשורה חדשה במקום לגלול אופקית. הגרירה תעבוד גם ככה, אבל חוויית קאנבן קלאסית היא `nowrap` + גלילה אופקית. זה מצב קיים בקוד ולא נגעתי בו — אם תרצה, אפשר לשנות בנפרד.
- **אין realtime listeners** ב-Firestore בפרויקט (`Layout.tsx` טוען הכל פעם אחת ב-mount), אז גרירה בטאב אחד לא תשתקף בטאב אחר עד רענון. התנהגות קיימת, לא קשור ל-DnD.
