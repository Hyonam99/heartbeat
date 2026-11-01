import { createSlice } from "@reduxjs/toolkit";
import { addDepartment, loadAll, removeDepartment, updateDepartment } from "@/store/thunks";
import type { Department } from "@/utils/types";

const initialState: { list: Department[] } = { list: [] };

const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAll.fulfilled, (state, action) => {
        state.list = action.payload.db.departments;
      })
      .addCase(addDepartment.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.list = state.list.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        );
      })
      .addCase(removeDepartment.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id !== action.payload);
      });
  },
});

export default departmentsSlice.reducer;
