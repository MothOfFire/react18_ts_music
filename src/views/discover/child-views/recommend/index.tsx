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
