# header、footer 组件的搭建

## 1 header 组件的搭建

### 安装 styled-components 插件

```bash

npm install styled-components -D

```

创建 components/app-header/style.ts 的文件

```ts
import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  height: 75px;
  background-color: #242424;
  font-size: 14px;
  color: #fff;

  .content {
    display: flex;
    justify-content: space-between;
  }

  .divider {
    height: 5px;
    background-color: #c20c0c;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;

  .logo {
    display: block;
    width: 176px;
    height: 70px;
    background-position: 0 0;
    text-indent: -9999px;
  }
  .title-list {
    display: flex;
    line-height: 70px;

    .title-item {
      position: relative;

      a {
        display: block;
        padding: 0 20px;
        color: #ccc;
        //clear: both;
      }

      &:last-of-type a {
        position: relative;
        ::after {
          position: absolute;
          content: '';
          width: 28px;
          height: 19px;
          background-image: url(${require('@/assets/img/sprite_01.png')});
          background-position: -190px 0;
          top: 20px;
          right: -15px;
        }
      }

      &:hover a,
      .active {
        color: #fff;
        background: #000;
        text-decoration: none;
      }

      .active .icon {
        position: absolute;
        display: inline-block;
        width: 12px;
        height: 7px;
        bottom: -1px;
        left: 50%;
        transform: translate(-50%, 0);
        background-position: -226px 0;
      }
    }
  }
`;
export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  color: #787878;
  font-size: 12px;

  > .search {
    width: 158px;
    height: 32px;
    border-radius: 16px;

    input {
      &::placeholder {
        font-size: 12px;
      }
    }
  }
  .search:hover {
    border-color: #d9d9d9 !important;
  }

  .center {
    width: 90px;
    height: 32px;
    line-height: 32px;
    margin: 0 16px;
    text-align: center;
    border: 1px solid #666;
    border-radius: 16px;
    color: #ccc;
    cursor: pointer;

    &:hover {
      color: #fff;
      border-color: #fff;
    }
  }
  .login {
    cursor: pointer;
  }
`;
```

由于使用的语言是 ts 而 styled-components 内部没有类型声明文件，在引入 styled-components 的时候会报错，所以需要安装 @types/styled-components 插件

```bash

npm install @types/styled-components -D

```

### 将一部分公共样式抽离到 theme 中

创建 assets/theme/index.ts 文件

```ts
const theme = {
  color: {
    primary: '#C20C0C'
  },
  size: {},
  mixin: {
    wrapv1: `
    width: 1100px;
    margin: 0 auto;
  `,
    textNowrap: `
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `
  }
};

export default theme;
```

修改 src/index.tsx 文件

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
//导入 ThemeProvider 组件
import { ThemeProvider } from 'styled-components';
import 'normalize.css';
import './assets/css/index.less';
import App from '@/App';
import store from '@/store';
//导入 theme 文件
import theme from '@/assets/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    {/* 使用 ThemeProvider 组件包裹 App 组件，就可以使 theme 文件的样式传给 App 组件 */}
    <ThemeProvider theme={theme}>
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  </Provider>
);

// React.StrictMode是reatc的严格模式，在开发时会渲染两次
```

在 components/app-header/style.ts 的文件样式中使用 `${(props) => props.theme.mixin.wrapv1}` 就可以将 theme 文件中的样式传给 AppHeader 组件,或者直接将 wrapv1 的样式写入 common.less 文件中，然后在 app-header/index.tsx 中修改 `<div className="content wrap-v1">` 也可将 wrapv1 样式传给 AppHeader 组件

### 将 AppHeader 组件中的本地数据抽离出来

创建 assets/data/header-title.json 文件，将 AppHeader 组件中的本地数据抽离出来

```json
[
  {
    "title": "发现音乐",
    "type": "path",
    "link": "/discover"
  },
  {
    "title": "我的音乐",
    "type": "path",
    "link": "/my"
  },
  {
    "title": "关注",
    "type": "path",
    "link": "/focus"
  },
  {
    "title": "商城",
    "type": "link",
    "link": "https://music.163.com/store/product"
  },
  {
    "title": "音乐人",
    "type": "link",
    "link": "https://music.163.com/st/musician"
  },
  {
    "title": "云推歌",
    "type": "path",
    "link": "https://music.163.com/st/ad-song/login"
  },
  {
    "title": "下载客户端",
    "type": "path",
    "link": "/download"
  }
]
```

### HeaderLeft

修改 components/app-header/index.tsx 文件

```tsx
import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { HeaderWrapper, HeaderLeft, HeaderRight } from './style';
import headerTitles from '@/assets/data/header-title.json';

interface IProps {
  children?: ReactNode;
}

const AppHeader: FC<IProps> = () => {
  // 定义组件内部的状态
  // 这种方式刷新时，会将 currentIndex 重新赋值为 0
  // const [currentIndex, setCurrentIndex] = useState(0);

  // 组件展示逻辑
  function showItem(item: any) {
    if (item.type === 'path') {
      return (
        <NavLink
          to={item.link}
          className={({ isActive }) => {
            return isActive ? 'active' : undefined;
          }}
        >
          {item.title}
          <i className="icon sprite_01"></i>
        </NavLink>
      );
    } else {
      return (
        <a href={item.link} rel="noreferrer" target="_blank">
          {item.title}
        </a>
      );
    }
  }

  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          <a className="logo sprite_01" href="/">
            网易云音乐
          </a>
          <div className="title-list">
            {headerTitles.map((item) => {
              return (
                <div className="title-item" key={item.title}>
                  {showItem(item)}
                </div>
              );
            })}
          </div>
        </HeaderLeft>
        <HeaderRight></HeaderRight>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  );
};

export default memo(AppHeader);
```

### HeaderRight

安装 antd

```bash

npm install antd

```

antd4.x需要在 assets/css/index.less 文件中引入 antd 样式 `@import '~antd/dist/antd.less';`，antd5.x 已经移除 less 文件

安装 antd-icon

```bash

npm install @ant-design/icons --save

```

修改 components/app-header/index.tsx 文件

```tsx
import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { HeaderWrapper, HeaderLeft, HeaderRight } from './style';
import headerTitles from '@/assets/data/header-title.json';

interface IProps {
  children?: ReactNode;
}

const AppHeader: FC<IProps> = () => {
  // 定义组件内部的状态
  // 这种方式刷新时，会将 currentIndex 重新赋值为 0
  // const [currentIndex, setCurrentIndex] = useState(0);

  // 组件展示逻辑
  function showItem(item: any) {
    if (item.type === 'path') {
      return (
        <NavLink
          to={item.link}
          className={({ isActive }) => {
            return isActive ? 'active' : undefined;
          }}
        >
          {item.title}
          <i className="icon sprite_01"></i>
        </NavLink>
      );
    } else {
      return (
        <a href={item.link} rel="noreferrer" target="_blank">
          {item.title}
        </a>
      );
    }
  }

  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          <a className="logo sprite_01" href="/">
            网易云音乐
          </a>
          <div className="title-list">
            {headerTitles.map((item) => {
              return (
                <div className="title-item" key={item.title}>
                  {showItem(item)}
                </div>
              );
            })}
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Input
            className="search"
            placeholder="音乐/视频/电台/用户"
            prefix={<SearchOutlined />}
          />
          <span className="center">创作者中心</span>
          <span className="login">登录</span>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  );
};

export default memo(AppHeader);
```
