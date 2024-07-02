import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './layouts/app-layout';
import LandingPage from './pages/landing';
import Dashboard from './pages/dashboard';
import Auth from './pages/auth';
import Link from './pages/link';
import RedirectLink from './pages/redirect-link';
import UrlProvider from './context';
import RequiredAuth from './components/require-auth';

const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:'/',
        element:<LandingPage/>
      },
      {
        path:'/dashboard',
        element:(<RequiredAuth>
              <Dashboard/>
        </RequiredAuth>
        ),
       
      },
      {
        path:'/auth',
        element:<Auth/>
      },
      {
        path:'/link/:id',
        element:(<RequiredAuth>
          <Link/>
        </RequiredAuth>
        ),
      },
      {
        path:'/:id',
        element:<RedirectLink/>
      },
    ],
  },
]);

function App() {

  return <UrlProvider>
<RouterProvider router={router} />
  </UrlProvider>
  
}

export default App;
