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
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import Users from './Pages/Profile/Users';
import DepositConfirm from './Pages/Deposite/DepositConfirm';
import AdminRoute from './Providers/AdminRoute';
import DepositRequest from './Pages/Profile/DepositRequest';
import History from './Pages/Profile/UserProfile/History';
import Pending from './Pages/Profile/UserProfile/Pending';
import UserHome from './Pages/Profile/UserProfile/UserHome';
import WithdrawRequests from './Pages/Profile/WithdrawHandle/WithdrawRequests';
import WheelGame from './Pages/Game/WheelGame/WheelGame';
import CoinFlipGame from './Pages/Game/CoinFlip/CoinFlipGame';
import AviatorGame from './Pages/Game/AviatorGame/AviatorGame';
import Ludo from './Pages/Game/Ludo/Ludo';

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
        path: '/deposite',
        element: <PrivateRoute><Deposite /></PrivateRoute>
      },
      {
        path: "/withdraw",
        element: <PrivateRoute><Withdraw /></PrivateRoute>
      },
      {
        path: "/refer",
        element: <PrivateRoute><Refer /></PrivateRoute>
      },
      {
        path: "/profile",
        element: <PrivateRoute><Profile /></PrivateRoute>,
        children: [
          {
            path: 'users',
            element: <AdminRoute><PrivateRoute><Users /></PrivateRoute></AdminRoute>
          },
          {
            path: 'depositReq',
            element: <AdminRoute><PrivateRoute><DepositRequest /></PrivateRoute></AdminRoute>
          },
          {
            path: 'history',
            element: <PrivateRoute><History /></PrivateRoute>
          },
          {
            path: 'withdrawReq',
            element: <AdminRoute><PrivateRoute><WithdrawRequests /></PrivateRoute></AdminRoute>
          },
          {
            path: 'pending',
            element: <PrivateRoute><Pending /></PrivateRoute>
          },
          {
            path: 'home',
            element: <PrivateRoute><UserHome /></PrivateRoute>
          },
        ]
      },
    ]
  },
  {
    path: "/depositConfirm/:amount/:method",
    element: <PrivateRoute><DepositConfirm /></PrivateRoute>
  },
  {
    path: "/wheelGame",
    element: <PrivateRoute><WheelGame /></PrivateRoute>
  },
  {
    path: "/coinFlip",
    element: <PrivateRoute><CoinFlipGame /></PrivateRoute>
  },
  {
    path: "/aviatorGame",
    element: <PrivateRoute><AviatorGame/></PrivateRoute>
  },
  {
    path: "/ludo",
    element: <PrivateRoute><Ludo/></PrivateRoute>
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster
          position="bottom-center"
          reverseOrder={false}
        />
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
)
