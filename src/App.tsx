import { BrowserRouter } from "react-router-dom";
import UserProvider from "./providers/UserProvider";
import Router from "./router/Router";
import ProjectThemeProvider from "./providers/ProjectThemeProvider";

function App() {
  return (
    <UserProvider>
      <ProjectThemeProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ProjectThemeProvider>
    </UserProvider>
  );
}

export default App;
