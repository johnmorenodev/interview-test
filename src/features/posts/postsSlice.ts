import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPostsByUserId } from "./api/getPostsByUserId";
import { Post } from "../users/types";

export const fetchPostByUserId = createAsyncThunk(
  "posts/fetchPostByUserId",
  async (id: number) => {
    return await getPostsByUserId(id);
  }
);

export interface InitialState {
  isLoading: boolean;
  error: string;
  posts: Post[];
}

export const initialState: InitialState = {
  isLoading: false,
  error: "",
  posts: [],
};

export const postsSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostByUserId.rejected, (state) => {
        state.isLoading = false;
        state.error = "Error has occured";
        state.posts = [];
      });
  },
});

export default postsSlice.reducer;
