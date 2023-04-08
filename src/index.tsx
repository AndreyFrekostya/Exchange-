import React from 'react';
import ReactDOM from 'react-dom/client';
import './null styles.css';
import './global styles.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

