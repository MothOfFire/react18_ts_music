import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

import AreaHeaderV1 from '@/components/area-header-v1';
import SongMenuItem from '@/components/song-menu-item';
import { HotRecommendWrapper } from './style';
import { shallowEqualApp, useAppSelector } from '@/store';

interface IProps {
  children?: ReactNode;
}

const HotRecommend: FC<IProps> = () => {
  const { HotRecommends } = useAppSelector(
    (state) => ({
      HotRecommends: state.recommend.hotRecommends
    }),
    shallowEqualApp
  );
  return (
    <HotRecommendWrapper>
      <AreaHeaderV1
        title="热门推荐"
        keywords={['华语', '流行', '摇滚', '民谣', '电子']}
        moreLink="/discover/songs"
      ></AreaHeaderV1>
      <div className="recommend-list">
        {HotRecommends.map((item) => {
          return <SongMenuItem key={item.id} songData={item}></SongMenuItem>;
        })}
      </div>
    </HotRecommendWrapper>
  );
};
export default memo(HotRecommend);
