import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './pages/Home.tsx';
import Event from './pages/Event.tsx';
import Register from './pages/SignUp.tsx';
import Error from './pages/Error.tsx';
import App from './App.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/event/:id',
        element: <Event />,
      },
      {
        path: '/signup',
        element: <Register />,
      },
    ],
  },
]);

const router1 = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>} errorElement={<Error/ >}>
      <Route index element={<Home/>}/>
      <Route path='/event/:id' element={<Event/>}/>
      <Route path='/signup' element={<Register/>}/>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router1} />
  </React.StrictMode>
);
