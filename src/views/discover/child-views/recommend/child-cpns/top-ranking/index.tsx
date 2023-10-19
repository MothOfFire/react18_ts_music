import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { useAppSelector, shallowEqualApp } from '@/store';
import { TopRankingWrapper } from './style';
import AreaHeaderV1 from '@/components/area-header-v1';
import TopRankingItem from '../top-ranking-item';

interface IProps {
  children?: ReactNode;
}

const TopRanking: FC<IProps> = () => {
  // 从 redux 获取数据
  const { topRankingData = [] } = useAppSelector(
    (state) => ({
      topRankingData: state.recommend.topRankingData
    }),
    shallowEqualApp
  );
  return (
    <TopRankingWrapper>
      <AreaHeaderV1 title="榜单" moreLink="/discover/ranking" />
      <div className="content">
        {topRankingData.map((item) => {
          return <TopRankingItem itemData={item} key={item.id} />;
        })}
      </div>
    </TopRankingWrapper>
  );
};

export default memo(TopRanking);
