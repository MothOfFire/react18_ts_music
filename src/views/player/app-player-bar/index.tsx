import React, { memo, useState, useRef, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { Slider, message, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

import {
  PlayerBarWrapper,
  BarControl,
  BarPlayerInfo,
  BarOperator
} from './style';
import { useAppSelector, shallowEqualApp, useAppDispatch } from '@/store';
import { formatImageSize, formatTime } from '@/utils/format';
import { getSongPlay } from '@/utils';
import {
  changeLyricIndexAction,
  changePlayMOdeAction,
  fetchChangeSongAction
} from '../store/player';

interface IProps {
  children?: ReactNode;
}

const AppPlayerBar: FC<IProps> = () => {
  // 定义组件内部的数据
  const [isPlay, setIsPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  // isSlider 记录是否处于拖拽状态
  const [isSlider, setSlider] = useState(false);
  const [modeText, setModeText] = useState('顺序播放');
  const audioRef = useRef<HTMLAudioElement>(null);

  // 获取数据
  const { currentSong, lyrics, lyricIndex, playMode } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      lyrics: state.player.lyrics,
      lyricIndex: state.player.lyricIndex,
      playMode: state.player.playMode
    }),
    shallowEqualApp
  );
  const dispatch = useAppDispatch();

  // 组件内的副作用操作
  useEffect(() => {
    // 播放音乐
    audioRef.current!.src = getSongPlay(currentSong.id);
    audioRef.current
      ?.play()
      .then(() => {
        setIsPlay(true);
        console.log('歌曲播放成功');
      })
      .catch((err) => {
        setIsPlay(false);
        console.log('歌曲播放失败', err);
      });
    // 获取总时长
    setDuration(currentSong.dt);
  }, [currentSong]);
  useEffect(() => {
    switch (playMode) {
      case 0:
        return setModeText('顺序播放');
      case 1:
        return setModeText('随机播放');
      case 2:
        return setModeText('单曲循环');
      default:
        return setModeText('顺序播放');
    }
  }, [playMode]);

  // 事件处理函数
  // 音乐播放进度处理
  function handleTimeUpdate() {
    // console.log('handleHimeUpdate', audioRef.current?.currentTime);
    // 获取当前的播放时间
    const currentProgressTime = audioRef.current!.currentTime;
    const currentTime = currentProgressTime! * 1000;
    setCurrentTime(currentTime);
    // 歌曲进度处理
    if (!isSlider) {
      const progress = (currentTime / duration) * 100;
      setProgress(progress);
      setCurrentTime(currentTime);
    }
    // 根据时间匹配对应歌词
    let index = lyrics.length - 1;
    for (let i = 0; i < lyrics.length; i++) {
      const lyric: any = lyrics[i];
      if (lyric.time > currentTime) {
        index = i - 1;
        break;
      }
    }
    // 匹配上对应的歌词的index
    if (lyricIndex === index || index === -1) return;
    dispatch(changeLyricIndexAction(index));
    // console.log(lyrics[index]?.text);
    // 展示对应的歌词
    message.open({
      content: (lyrics[index] as any).text,
      key: 'lyric',
      duration: 0
    });
  }
  // 播放按钮点击事件处理
  function handlePlayBtnClick() {
    // 控制播放器的播放/暂停
    isPlay
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlay(false));
    // 改变 isplay 的状态
    setIsPlay(!isPlay);
  }
  // 进度条点击事件
  function handleSliderChanged(value: number) {
    // 获取点击位置时间
    const currentTime = (value / 100) * duration;
    //设置当前播放的时间
    audioRef.current!.currentTime = currentTime / 1000;
    setCurrentTime(currentTime);
    setProgress(value);
    setSlider(false);
  }
  // 进度条拖拽事件
  function handleSliderChanging(value: number) {
    // 目前是处于拖拽状态
    setSlider(true);
    // 获取value对应位置的时间
    const currentTime = (value / 100) * duration;
    setCurrentTime(currentTime);
    // 设置进度条当前时间
    setProgress(value);
  }
  // 当前歌曲播放结束后操作
  function changeTimeEnded() {
    console.log(playMode, 'playMode');
    if (playMode === 2) {
      audioRef.current!.currentTime = 0;
      audioRef.current?.play();
    } else {
      changeSongPlayClick(true);
    }
  }
  //播放歌曲切换
  function changeSongPlayClick(isNext = true) {
    dispatch(fetchChangeSongAction(isNext));
  }
  // 播放模式切换
  function changeModeClick() {
    let newPlayMode = playMode + 1;
    if (newPlayMode > 2) newPlayMode = 0;
    dispatch(changePlayMOdeAction(newPlayMode));
  }

  return (
    <PlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl className="control" isPlay={isPlay}>
          <button
            className="btn sprite_playbar prev"
            onClick={() => changeSongPlayClick(false)}
          ></button>
          <button
            className="btn sprite_playbar play"
            onClick={handlePlayBtnClick}
          ></button>
          <button
            className="btn sprite_playbar next"
            onClick={() => changeSongPlayClick()}
          ></button>
        </BarControl>
        <BarPlayerInfo>
          <Link to="/player">
            <img
              className="image"
              src={formatImageSize(currentSong?.al?.picUrl, 34)}
              alt={currentSong?.al?.name}
            />
          </Link>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong?.name}</span>
              <span className="singer-name">
                {currentSong?.ar?.[0]?.name} / {currentSong?.ar?.[1]?.name}
              </span>
            </div>
            <div className="progress">
              <Slider
                step={0.5}
                value={progress}
                tooltip={{ formatter: null }}
                onChange={handleSliderChanging}
                onAfterChange={handleSliderChanged}
              />
              <div className="time">
                <span className="current">{formatTime(currentTime)}</span>
                <span className="divider">/</span>
                <span className="duration">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </BarPlayerInfo>
        <BarOperator playMode={playMode}>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <Tooltip title={modeText}>
              <button
                className="btn sprite_playbar loop"
                onClick={changeModeClick}
              ></button>
            </Tooltip>
            <button className="btn sprite_playbar playlist"></button>
          </div>
        </BarOperator>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={changeTimeEnded}
      ></audio>
    </PlayerBarWrapper>
  );
};

export default memo(AppPlayerBar);
