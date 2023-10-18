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
