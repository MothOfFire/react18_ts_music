# discover

## 1导航栏

创建 src/assets/data/local_data.ts 文件中添加数据

```ts
export const discoverMenu = [
  {
    title: '推荐',
    link: '/discover/recommend'
  },
  {
    title: '排行榜',
    link: '/discover/ranking'
  },
  {
    title: '歌单',
    link: '/discover/songs'
  },
  {
    title: '主播电台',
    link: '/discover/djradio'
  },
  {
    title: '歌手',
    link: '/discover/artist'
  },
  {
    title: '新碟上架',
    link: '/discover/album'
  }
];

export const footerLinks = [
  {
    title: '服务条款',
    link: 'https://st.music.163.com/official-terms/service'
  },
  {
    title: '隐私政策',
    link: 'https://st.music.163.com/official-terms/privacy'
  },
  {
    title: '儿童隐私政策',
    link: 'https://st.music.163.com/official-terms/children'
  },
  {
    title: '版权控诉指引',
    link: 'https://music.163.com/st/staticdeal/complaints.html'
  },
  {
    title: '意见反馈',
    link: '#'
  }
];

export const footImages = [
  {
    link: 'https://music.163.com/st/userbasic#/auth'
  },
  {
    link: 'https://music.163.com/recruit'
  },
  {
    link: 'https://music.163.com/web/reward'
  },
  {
    link: 'https://music.163.com/uservideo#/plan'
  }
];
```

在 discover 文件夹下创建一个 nav-bar/index.tsx、nav-bar/style.ts

```tsx
import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { NavWrapper } from './style';
import { discoverMenu } from '@/assets/data/local_data';

interface IProps {
  children?: ReactNode;
}

const NavBar: FC<IProps> = () => {
  return (
    <NavWrapper>
      <div className="nav wrap-v1">
        {discoverMenu.map((item, index) => {
          return (
            <div className="item" key={index}>
              <NavLink to={item.link}>{item.title}</NavLink>
            </div>
          );
        })}
      </div>
    </NavWrapper>
  );
};

export default memo(NavBar);
```

```ts
import styled from 'styled-components';

export const NavWrapper = styled.div`
  height: 30px;
  background: ${(props) => props.theme.color.primary};
  // background: #c20c0c;
  .nav {
    display: flex;
    padding-left: 180px;
    position: relative;
    top: -4px;

    .item {
      a {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        padding: 0 13px;
        margin: 7px 17px 0;
        color: #fff;
        font-size: 12px;

        &:hover,
        &.active {
          text-decoration: none;
          background-color: #9b0909;
          border-radius: 20px;
        }
      }
    }
  }
`;
```

在 discover/index.tsx 中引入 NavBar

```tsx
import React, { memo, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { useAppDispatch } from '@/store';
import { fetchBannerDataAction } from './store/recommend';
import TopSwiper from './child-cpns/top-swiper';

interface IProps {
  children?: ReactNode;
}

const Recommend: FC<IProps> = () => {
  // 发起 action 请求，获取数据
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBannerDataAction());
  }, []);

  return (
    <div>
      <TopSwiper />
      recommend
    </div>
  );
};

export default memo(Recommend);
```

## 2recommend

### 服务请求和状态管理

#### 服务请求 service

创建 service/recommend.ts 文件

```ts
import XSRequest from '@/service';

export function getBanner() {
  return XSRequest.get({
    url: '/banner'
  });
}
```

#### 状态管理 store

创建 store/recommend.ts 文件

```ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBanner } from '../service/recommend';

export const fetchBannerDataAction = createAsyncThunk('banners', async () => {
  const res = await getBanner();
  console.log(res);
  return res.banners;
});

interface IRecommendState {
  banners: any[];
}

const initialState: IRecommendState = {
  banners: []
};

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBannerDataAction.pending, () => {
        console.log('pending');
      })
      .addCase(fetchBannerDataAction.fulfilled, (state, { payload }) => {
        state.banners = payload;
      })
      .addCase(fetchBannerDataAction.rejected, () => {
        console.log('rejected');
      });
  }
});

export default recommendSlice.reducer;
```

在 src/store/index.ts 文件中进行注册`recommend: recommendReducer`

### 轮播图

安装 classnames 动态添加类名插件

```bash

npm install classnames

```

创建 child-cpns/top-swiper/index.tsx、child-cpns/top-swiper/style.ts 文件

```tsx
import React, { memo, useRef, useState, useCallback } from 'react';
import type { FC, ReactNode, ElementRef } from 'react';
import { Carousel } from 'antd';
import classNames from 'classnames';

import { useAppSelector, shallowEqualApp } from '@/store';
import { BannerWrapper, BannerLeft, BannerRight, BannerControl } from './style';

interface IProps {
  children?: ReactNode;
}

const TopSwiper: FC<IProps> = () => {
  // 定义内部数据
  // 绑定 Carousel 组件
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // 从 store 中获取数据
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqualApp
  );

  // 事件处理函数
  // 走马灯逻辑
  const onCarouselBeforechange = useCallback((from: number, to: number) => {
    setCurrentIndex(to);
  }, []);
  function handlePrevClick() {
    bannerRef.current?.prev();
  }
  function handleNextClick() {
    bannerRef.current?.next();
  }
  // function handleAfterChange(current: number) {
  //   // console.log(current);
  //   setCurrentIndex(current);
  // }
  // 指示器
  const onDotClick = (index: number) => {
    bannerRef.current?.goTo(index);
  };

  // 获取背景图片
  const bgImgUrl =
    currentIndex >= 0 && banners?.length > 0
      ? banners[currentIndex].imageUrl + '?imageView&blur=40x20'
      : '';

  return (
    <BannerWrapper
      style={{
        background: `url(${bgImgUrl}) center center / 6000px`
      }}
    >
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            autoplay
            dots={false}
            ref={bannerRef}
            effect="fade"
            // afterChange={handleAfterChange}
            beforeChange={onCarouselBeforechange}
          >
            {banners.map((item) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              );
            })}
          </Carousel>
          {/* 轮播图指示器 */}
          <ul className="dots">
            {banners.map((item, index) => {
              return (
                <li key={item.imageUrl}>
                  <span
                    className={classNames('item', {
                      active: index === currentIndex
                    })}
                    onClick={() => onDotClick(index)}
                  ></span>
                </li>
              );
            })}
          </ul>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={handlePrevClick}></button>
          <button className="btn right" onClick={handleNextClick}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  );
};

export default memo(TopSwiper);
```

```ts
import styled from 'styled-components';

export const BannerWrapper = styled.div`
  .banner {
    height: 270px;
    display: flex;
    position: relative;
  }
`;
export const BannerLeft = styled.div`
  position: relative;
  width: 730px;

  .banner-item {
    overflow: hidden;
    height: 270px;
    .image {
      width: 100%;
    }
  }

  .dots {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    justify-content: center;

    > li {
      margin: 0 2px;

      .item {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url(${require('@/assets/img/banner_sprite.png')}) 3px -343px;
        cursor: pointer;

        &:hover,
        &.active {
          background-position: -16px -343px;
        }
      }
    }
  }
`;
export const BannerRight = styled.a.attrs({
  href: 'https://music.163.com/#/download',
  target: '_blank'
})`
  width: 254px;
  height: 270px;
  background: url(${require('@/assets/img/download.png')});
`;
export const BannerControl = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 63px;
  transform: translateY(-50%);

  .btn {
    position: absolute;
    width: 37px;
    height: 63px;
    background-image: url(${require('@/assets/img/banner_sprite.png')});
    background-color: transparent;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  .left {
    left: -68px;
    background-position: 0 -360px;
  }

  .right {
    right: -68px;
    background-position: 0 -508px;
  }
`;
```
