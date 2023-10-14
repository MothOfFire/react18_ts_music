import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import 'normalize.css';
import './assets/css/index.less';
import App from '@/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);

// React.StrictMode是reatc的严格模式，在开发时会渲染两次
