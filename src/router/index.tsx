import React from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import Discover from '@/views/discover';
import My from '@/views/my';
import Focus from '@/views/focus';
import Download from '@/views/download';

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
