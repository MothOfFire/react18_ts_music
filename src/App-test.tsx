import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { useAppSelector, useAppDispatch, shallowEqualApp } from './store';
import routes from './router';
import { changeMessageAction } from './store/modules/counter';
import AppHeader from './components/app-header';
import AppFooter from './components/app-footer';

function App() {
  const { count, message } = useAppSelector(
    (state) => ({
      count: state.counter.count,
      message: state.counter.message
    }),
    shallowEqualApp
  );

  // 事件处理函数
  const dispatch = useAppDispatch();
  function handleChangeMessage() {
    console.log('handleChangeMessage');
    dispatch(changeMessageAction('hello Redux'));
  }

  return (
    <div className="App">
      <AppHeader />
      <Suspense fallback="loading...">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
      <AppFooter />

      <h2>当前计数: {count}</h2>
      <h2>当前消息: {message}</h2>
      <button onClick={handleChangeMessage}>修改消息</button>
    </div>
  );
}

export default App;
