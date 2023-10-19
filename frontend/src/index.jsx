import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/components/App.jsx';
import { BrowserRouter } from 'react-router-dom'
import './index.css';

window.global = window; //справление ошибки ReferenceError: global is not defined

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
