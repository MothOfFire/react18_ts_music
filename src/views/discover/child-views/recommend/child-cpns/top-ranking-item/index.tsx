import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { RankingItemWrapper } from './style';
import { formatImageSize } from '@/utils/format';

interface IProps {
  children?: ReactNode;
  itemData: any;
}

const TopRankingItem: FC<IProps> = (props) => {
  const { itemData } = props;
  const { tracks = [] } = itemData;
  return (
    <RankingItemWrapper>
      <div className="header">
        <div className="image">
          <img
            src={formatImageSize(itemData.coverImgUrl, 80)}
            alt="itemData.name"
          />
          <a href="" className="sprite_cover"></a>
        </div>
        <div className="info">
          <div className="name">{itemData.name}</div>
          <div>
            <button className="sprite_02 btn play"></button>
            <button className="sprite_02 btn favor"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {tracks.slice(0, 10).map((item: any, index: number) => {
          return (
            <div className="item" key={item.id}>
              <div className="index">{index + 1}</div>
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="operator">
                  <button className="btn sprite_02 play"></button>
                  <button className="btn sprite_icon2 add"></button>
                  <button className="btn sprite_02 favor"></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="footer">
        <Link to="/discover/ranking">查看全部&gt;</Link>
      </div>
    </RankingItemWrapper>
  );
};

export default memo(TopRankingItem);
