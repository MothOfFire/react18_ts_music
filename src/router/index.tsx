import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

// import Discover from '@/views/discover';
// import My from '@/views/my';
// import Focus from '@/views/focus';
// import Download from '@/views/download';

// 路由懒加载组件
const Discover = lazy(() => import('@/views/discover'));
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
    element: <Discover />
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
