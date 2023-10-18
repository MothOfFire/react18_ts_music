import { configureStore } from '@reduxjs/toolkit';
import {
  useSelector,
  TypedUseSelectorHook,
  useDispatch,
  shallowEqual
} from 'react-redux';
import counterReducer from './modules/counter';
import recommendReducer from '../views/discover/child-views/recommend/store/recommend';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    recommend: recommendReducer
  }
});

// const state = store.getState();
// type stateType = typeof state;

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
