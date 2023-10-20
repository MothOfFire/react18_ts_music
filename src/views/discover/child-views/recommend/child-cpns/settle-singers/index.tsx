import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { SingerWrapper } from './style';
import AreaHeaderV2 from '@/components/area-header-v2';
import { shallowEqualApp, useAppSelector } from '@/store';
import { formatImageSize } from '@/utils';

interface IProps {
  children?: ReactNode;
}

const SettleSingers: FC<IProps> = () => {
  // 获取数据
  const { singerData } = useAppSelector(
    (state) => ({
      singerData: state.recommend.singerData
    }),
    shallowEqualApp
  );
  return (
    <SingerWrapper>
      <AreaHeaderV2
        title="入住歌手"
        moreText="查看全部&gt;"
        moreLink="#/discover/artist"
      />
      <div className="artists">
        {singerData.map((item) => {
          return (
            <a href="#/discover/artist" className="item" key={item.id}>
              <img src={formatImageSize(item.picUrl, 80)} alt={item.name} />
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="alias">{item.alias.join(' ')}</div>
              </div>
            </a>
          );
        })}
      </div>
      <div className="apply-for">
        <a href="#/">申请成为网易音乐人</a>
      </div>
    </SingerWrapper>
  );
};

export default memo(SettleSingers);
