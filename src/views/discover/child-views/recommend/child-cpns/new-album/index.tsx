import React, { memo, useRef } from 'react';
import type { FC, ReactNode, ElementRef } from 'react';
import { Carousel } from 'antd';

import { NewAlbumWrapper } from './style';
import AreaHeaderV1 from '@/components/area-header-v1';
import NewAblumItem from '@/components/new-ablum-item';
import { useAppSelector, shallowEqualApp } from '@/store';

interface IProps {
  children?: ReactNode;
}

const NewAlbum: FC<IProps> = () => {
  // 定义内部数据
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null);

  // 从 redux 中获取数据
  const { albumNewData } = useAppSelector(
    (state) => ({
      albumNewData: state.recommend.albumNewestData
    }),
    shallowEqualApp
  );

  // 事件处理函数
  function handlePrevClick() {
    // console.log('Prev');
    bannerRef.current?.prev();
  }
  function handleNextClick() {
    // console.log('Next');
    bannerRef.current?.next();
  }
  return (
    <NewAlbumWrapper>
      <AreaHeaderV1 title="新碟上架" moreLink="/discover/album" />
      <div className="content">
        {/* 左边轮播图控制器 */}
        <button
          className="sprite_02 arrow arrow-left"
          onClick={handlePrevClick}
        ></button>
        {/* 轮播图 */}
        <div className="banner">
          <Carousel ref={bannerRef} dots={false} speed={1500}>
            {[0, 1].map((item) => {
              return (
                // Carousel 会自动在 div 元素上内联一个 display:inline-block; 普通的 css 样式无法覆盖，所以对循环渲染的组件再嵌套一层 div 再做 css 样式
                <div key={item}>
                  <div className="album-list">
                    {albumNewData
                      .slice(item * 5, (item + 1) * 5)
                      .map((ablum) => {
                        return (
                          <NewAblumItem key={ablum.id} albumData={ablum} />
                        );
                      })}
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
        {/* 右边轮播图控制器 */}
        <button
          className="sprite_02 arrow arrow-right"
          onClick={handleNextClick}
        ></button>
      </div>
    </NewAlbumWrapper>
  );
};

export default memo(NewAlbum);
