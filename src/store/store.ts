import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/usersSlice";
import postsReducer from "../features/posts/postsSlice";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
  user: userReducer,
  post: postsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return {
    ...store,
    preloadedState,
  };
}

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
