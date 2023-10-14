import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './assets/css/index.less';
import App from '@/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);

// React.StrictMode是reatc的严格模式，在开发时会渲染两次
