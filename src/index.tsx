import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './state/store'; // Убедитесь, что это ваш Redux store
import {AppWithRedux} from './AppWithRedux'; // Ваш главный компонент приложения

// const container = document.getElementById('root');
// // if (!container) throw new Error("Container not found");

// const root = ReactDOM.createRoot(container);
// root.render(
//   <Provider store={store}>
//     <AppWithRedux />
	 
//   </Provider>
// );

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
  <AppWithRedux />
  </Provider>
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
