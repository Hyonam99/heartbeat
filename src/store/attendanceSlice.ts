import { createSlice } from "@reduxjs/toolkit";
import { checkIn, loadAll, overrideCheckIn } from "@/store/thunks";
import type { Attendance } from "@/utils/types";

const initialState: { records: Attendance[] } = { records: [] };

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAll.fulfilled, (state, action) => {
        state.records = action.payload.db.attendance;
      })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.records.push(action.payload);
      })
      .addCase(overrideCheckIn.fulfilled, (state, action) => {
        state.records.push(action.payload);
      });
  },
});

export default attendanceSlice.reducer;
