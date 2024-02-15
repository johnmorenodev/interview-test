import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/usersSlice";
import postsReducer from "../features/posts/postsSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
