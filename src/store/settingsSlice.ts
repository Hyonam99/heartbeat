import { createSlice } from "@reduxjs/toolkit";
import { seedSettings } from "@/constants/seed";
import { loadAll, saveSettings } from "@/store/thunks";
import type { Settings } from "@/utils/types";

const settingsSlice = createSlice({
  name: "settings",
  initialState: seedSettings as Settings,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAll.fulfilled, (_, action) => action.payload.db.settings)
      .addCase(saveSettings.fulfilled, (_, action) => action.payload);
  },
});

export default settingsSlice.reducer;
