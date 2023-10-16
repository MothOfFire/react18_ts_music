import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  count: number;
  message: string;
  direction: 'left' | 'right' | 'up' | 'down';
}

const initialState: IState = {
  count: 100,
  message: 'Hello World',
  direction: 'right'
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
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
    changeMessageAction: (state, { payload }: PayloadAction<string>) => {
      state.message = payload;
    }
  }
});

export const { increment, decrement, incrementByAmount, changeMessageAction } =
  counterSlice.actions;
export default counterSlice.reducer;
