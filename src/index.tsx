import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './state/store'; // Убедитесь, что это ваш Redux store
import {AppWithRedux} from './AppWithRedux'; // Ваш главный компонент приложения
import { Login } from './Login';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { TodolistContainer } from './TodolistContainer';
import { ErrorPage } from './ErrorPage';

const router = createBrowserRouter([
  {
      path: "/",
      element: <AppWithRedux/>,
      errorElement: <Navigate to="/404"/>,
      children: [
        {
          index: true,
          element: <Navigate to="/todolists"/>
        },
          {
              path: "/login",
              element: <Login/>,
          },
          {
              path: "/todolists",
              element: <TodolistContainer/>,
          },
      ],
  },
  {
    path: "/404",
    element: <ErrorPage/>,
}
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
  <RouterProvider router={router}/>
  </Provider>
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
