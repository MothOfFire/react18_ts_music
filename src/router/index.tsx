import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

// import Discover from '@/views/discover';
// import My from '@/views/my';
// import Focus from '@/views/focus';
// import Download from '@/views/download';
// import Album from '@/views/discover/child-views/album';

// 路由懒加载组件
const Discover = lazy(() => import('@/views/discover'));
const Album = lazy(() => import('@/views/discover/child-views/album'));
const Artist = lazy(() => import('@/views/discover/child-views/artist'));
const Djradio = lazy(() => import('@/views/discover/child-views/djradio'));
const Ranking = lazy(() => import('@/views/discover/child-views/ranking'));
const Recommend = lazy(() => import('@/views/discover/child-views/recommend'));
const Songs = lazy(() => import('@/views/discover/child-views/songs'));
const My = lazy(() => import('@/views/my'));
const Focus = lazy(() => import('@/views/focus'));
const Download = lazy(() => import('@/views/download'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/discover" />
  },
  {
    path: '/discover',
    element: <Discover />,
    children: [
      {
        path: '/discover',
        element: <Navigate to="/discover/recommend" />
      },
      {
        path: '/discover/album',
        element: <Album />
      },
      {
        path: '/discover/artist',
        element: <Artist />
      },
      {
        path: '/discover/djradio',
        element: <Djradio />
      },
      {
        path: '/discover/ranking',
        element: <Ranking />
      },
      {
        path: '/discover/recommend',
        element: <Recommend />
      },
      {
        path: '/discover/songs',
        element: <Songs />
      }
    ]
  },
  {
    path: '/my',
    element: <My />
  },
  {
    path: '/focus',
    element: <Focus />
  },
  {
    path: '/download',
    element: <Download />
  }
];

export default routes;
