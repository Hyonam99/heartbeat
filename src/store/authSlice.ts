import { createSlice } from "@reduxjs/toolkit";
import { loadAll, signIn, signOut } from "@/store/thunks";

type AuthState = { isReady: boolean; userId: string | null };

const initialState: AuthState = { isReady: false, userId: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAll.fulfilled, (state, action) => {
        state.isReady = true;
        state.userId = action.payload.sessionUserId;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.userId = action.payload;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.userId = null;
      });
  },
});

export default authSlice.reducer;
