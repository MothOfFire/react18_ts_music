import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './modules/counter';
import {
  useSelector,
  TypedUseSelectorHook,
  useDispatch,
  shallowEqual
} from 'react-redux';

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});

// 先获取 store.getState 的类型
type GetStateFnType = typeof store.getState;
//再获取函数返回值类型，就可以拿到 store 的类型
type IRootState = ReturnType<GetStateFnType>;
type DispatchType = typeof store.dispatch;

// useAppSelector 的 hook
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch: () => DispatchType = useDispatch;
export const shallowEqualApp = shallowEqual;

export default store;
