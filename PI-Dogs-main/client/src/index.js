import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './reducer/store.js';
import { lazy,Suspense } from 'react';
const App=lazy(()=>import( './App'));

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <Suspense fallback={<h1 style={{color:'white'}}>Cargando</h1>}
          
        >
         <App />
        </Suspense>
      </Provider>   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
