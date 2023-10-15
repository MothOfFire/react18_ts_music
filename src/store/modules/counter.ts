import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 100,
    message: 'Hello World'
  },
  reducers: {
    increment: (state) => {
      state.count++;
    },
    decrement: (state) => {
      state.count--;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
    changeMessageAction: (state, { payload }) => {
      state.message = payload;
    }
  }
});

export const { increment, decrement, incrementByAmount, changeMessageAction } =
  counterSlice.actions;
export default counterSlice.reducer;
