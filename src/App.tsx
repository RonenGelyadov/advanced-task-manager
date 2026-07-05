import { BrowserRouter } from 'react-router-dom';
import UserProvider from './providers/UserProvider';
import Layout from './layout/Layout';
import Router from './router/Router';
import ProjectThemeProvider from './providers/ProjectThemeProvider';

function App() {
  return (
    <UserProvider>
      <ProjectThemeProvider>
        <BrowserRouter>
          <Layout>
            <Router />
          </Layout>
        </BrowserRouter>
      </ProjectThemeProvider>
    </UserProvider>
  );
}

export default App;
