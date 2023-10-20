import React, { Suspense, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './router';
import AppHeader from './components/app-header';
import AppFooter from './components/app-footer';
import AppPlayerBar from './views/player/app-player-bar';
import { useAppDispatch } from './store';
import { fetchCurrentSongAction } from './views/player/store/player';

function App() {
  // 测试获取一首歌
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCurrentSongAction(2062730658));
  }, []);
  return (
    <div className="App">
      <AppHeader />
      <Suspense fallback="loading...">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
      <AppFooter />
      {/* 播放器控制栏 */}
      <AppPlayerBar />
    </div>
  );
}

export default App;
