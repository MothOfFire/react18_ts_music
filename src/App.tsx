import React, { Suspense } from 'react';
import { useRoutes, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch, shallowEqualApp } from './store';
import routes from './router';
import { changeMessageAction } from './store/modules/counter';

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
      <div className="nav">
        <Link to="/discover">发现音乐</Link>
        <Link to="/my">我的音乐</Link>
        <Link to="/focus">关注</Link>
        <Link to="/download">下载客户端</Link>
      </div>
      <h2>当前计数: {count}</h2>
      <h2>当前消息: {message}</h2>
      <button onClick={handleChangeMessage}>修改消息</button>
      <Suspense fallback="loading...">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
    </div>
  );
}

export default App;
