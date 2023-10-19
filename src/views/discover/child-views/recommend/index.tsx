import React, { memo, useEffect } from 'react';
import type { FC, ReactNode } from 'react';

import { useAppDispatch } from '@/store';
import {
  fetchBannerDataAction,
  fetchHotRecommendsAction,
  fetchAlbumNewestAction,
  fetchTopRankingAction,
  fetchSingerDataAction
} from './store/recommend';
import TopSwiper from './child-cpns/top-swiper';
import HotRecommend from './child-cpns/hot-recommend';
import NewAlbum from './child-cpns/new-album';
import TopRanking from './child-cpns/top-ranking';
import { RecommendWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const Recommend: FC<IProps> = () => {
  // 发起 action 请求，获取数据
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBannerDataAction());
    dispatch(fetchHotRecommendsAction());
    dispatch(fetchAlbumNewestAction());
    dispatch(fetchTopRankingAction());
    dispatch(fetchSingerDataAction());
  }, []);

  return (
    <RecommendWrapper>
      <TopSwiper />
      <div className="content wrap-v2">
        <div className="left">
          <HotRecommend />
          <NewAlbum />
          <TopRanking />
        </div>
        <div className="right">right</div>
      </div>
    </RecommendWrapper>
  );
};

export default memo(Recommend);
