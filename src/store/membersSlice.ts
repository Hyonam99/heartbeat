import { createSlice } from "@reduxjs/toolkit";
import { addMember, loadAll, removeDepartment, updateMember } from "@/store/thunks";
import type { User } from "@/utils/types";

const initialState: { users: User[] } = { users: [] };

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAll.fulfilled, (state, action) => {
        state.users = action.payload.db.users;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.users = state.users.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        );
      })
      .addCase(removeDepartment.fulfilled, (state, action) => {
        state.users.forEach((user) => {
          user.departments = user.departments.filter((id) => id !== action.payload);
        });
      });
  },
});

export default membersSlice.reducer;
