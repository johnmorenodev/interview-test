import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers } from "./api/getUser";
import { User } from "./types";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await getUsers();
});

export interface InitialState {
  users: User[];
  isLoading: boolean;
  error: string;
  searchQuery: string;
}

export const initialState: InitialState = {
  users: [],
  isLoading: true,
  error: "",
  searchQuery: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    handleSearch: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
        state.error = "Error has occured";
        state.users = [];
      });
  },
});

export const { handleSearch } = usersSlice.actions;

export default usersSlice.reducer;
