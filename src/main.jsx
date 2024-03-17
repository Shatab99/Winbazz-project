import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './Root';
import Home from './Pages/Home/Home';
import AuthProvider from './Providers/AuthProvider';
import { Toaster } from 'react-hot-toast';
import Deposite from './Pages/Deposite/Deposite';
import PrivateRoute from './Providers/PrivateRoute';
import Withdraw from './Pages/Withdraw/Withdraw';
import Refer from './Pages/Refer/Refer';
import Profile from './Pages/Profile/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path : '/deposite',
        element : <PrivateRoute><Deposite/></PrivateRoute>
      },
      {
        path : "/withdraw",
        element : <PrivateRoute><Withdraw/></PrivateRoute>
      },
      {
        path : "/refer",
        element : <PrivateRoute><Refer/></PrivateRoute>
      },
      {
        path : "/profile",
        element : <PrivateRoute><Profile/></PrivateRoute>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </AuthProvider>
  </React.StrictMode>,
)
