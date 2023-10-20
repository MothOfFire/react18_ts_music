import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSongDetail, getSongLyric } from '../service/player';
import { ILyric, parseLyric } from '@/utils/parse-lyric';

export const fetchCurrentSongAction = createAsyncThunk(
  'currentSong',
  (id: number, { dispatch }) => {
    //获取歌曲信息
    getSongDetail(id).then((res) => {
      // console.log(res);
      if (!res.songs.length) return;
      const song = res.songs[0];
      // console.log(song);
      dispatch(changeCurrentSongAction(song));
    });
    // 获取歌词数据
    getSongLyric(id).then((res) => {
      // console.log('歌词数据', res);
      // 获取歌词的字符串
      const lyricString = res.lrc.lyric;
      // console.log(lyricString);
      // 对歌词进行解析
      const lyrics = parseLyric(lyricString);
      // console.log(lyrics);
      dispatch(changeLyricAction(lyrics));
    });
  }
);

interface IPlayerState {
  currentSong: any;
  lyrics: ILyric[];
  lyricIndex: number;
}

const initialState: IPlayerState = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload;
    },
    changeLyricAction(state, { payload }) {
      state.lyrics = payload;
    },
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload;
    }
    // changePlaySongList(state, { payload }) {
    //   state.playSongList = payload;
    // },
    // changePlaySongIndex(state, { payload }) {
    //   state.playSongIndex = payload;
    // },
    // changePlayMOdeAction(state, { payload }) {
    //   state.playMode = payload;
    // }
  }
});

export const {
  changeCurrentSongAction,
  changeLyricAction,
  changeLyricIndexAction
  // changePlaySongList,
  // changePlaySongIndex,
  // changePlayMOdeAction
} = playerSlice.actions;
export default playerSlice.reducer;
