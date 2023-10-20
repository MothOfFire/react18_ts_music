import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Slider } from 'antd';

import {
  PlayerBarWrapper,
  BarControl,
  BarPlayerInfo,
  BarOperator
} from './style';
import { Link } from 'react-router-dom';

interface IProps {
  children?: ReactNode;
}

const AppPlayerBar: FC<IProps> = () => {
  return (
    <PlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl className="control" isPlay={true}>
          <button className="btn sprite_playbar prev"></button>
          <button className="btn sprite_playbar play"></button>
          <button className="btn sprite_playbar next"></button>
        </BarControl>
        <BarPlayerInfo>
          <Link to="/player">
            <img
              className="image"
              src="https://p1.music.126.net/3-PveIIWbJz9_FpZ_2Q3Ow==/109951168729156220.jpg?param=34y34"
              alt=""
            />
          </Link>
          <div className="info">
            <div className="song">
              <span className="song-name">Φ²</span>
              <span className="singer-name">HOYO-MiX / TetraCalyx</span>
            </div>
            <div className="progress">
              <Slider />
              <div className="time">
                <span className="current">00:00</span>
                <span className="divider">/</span>
                <span className="duration">02:56</span>
              </div>
            </div>
          </div>
        </BarPlayerInfo>
        <BarOperator playMode={0}>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <button className="btn sprite_playbar loop"></button>
            <button className="btn sprite_playbar playlist"></button>
          </div>
        </BarOperator>
      </div>
    </PlayerBarWrapper>
  );
};

export default memo(AppPlayerBar);
