# App.tsx 整体搭建

## 1 创建 app-header、app-footer 组件

创建 components/app-header/index.tsx、components/app-footer/index.tsx 文件

```tsx
// components/app-header/index.tsx

import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  children?: ReactNode;
}

const AppHeader: FC<IProps> = () => {
  return (
    <div className="nav">
      <Link to="/discover">发现音乐</Link>
      <Link to="/my">我的音乐</Link>
      <Link to="/focus">关注</Link>
      <Link to="/download">下载客户端</Link>
    </div>
  );
};

export default memo(AppHeader);

// components/app-footer/index.tsx

import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const AppFooter: FC<IProps> = () => {
  return <div>AppFooter</div>;
};

export default memo(AppFooter);
```

## 2 修改 App.tsx

```tsx
import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './router';
import AppHeader from './components/app-header';
import AppFooter from './components/app-footer';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Suspense fallback="loading...">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
      <AppFooter />
    </div>
  );
}

export default App;
```
