import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './index.css'
import Root from './component/Root/Root';
import AuthProvider from './component/AuthProvider/AuthProvider';
import Login from './component/Login/Login';
import Register from './component/Register/Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
  },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
  
]);



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
