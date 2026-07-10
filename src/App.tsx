import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
import ProjectThemeProvider from './providers/ProjectThemeProvider';

function App() {
  return (
    <ProjectThemeProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ProjectThemeProvider>
  );
}

export default App;
