import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBanner } from '../service/recommend';

export const fetchBannerDataAction = createAsyncThunk('banners', async () => {
  const res = await getBanner();
  console.log(res);
  return res.banners;
});

interface IRecommendState {
  banners: any[];
}

const initialState: IRecommendState = {
  banners: []
};

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBannerDataAction.pending, () => {
        console.log('pending');
      })
      .addCase(fetchBannerDataAction.fulfilled, (state, { payload }) => {
        state.banners = payload;
      })
      .addCase(fetchBannerDataAction.rejected, () => {
        console.log('rejected');
      });
  }
});

export default recommendSlice.reducer;
