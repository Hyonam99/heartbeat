import { createAsyncThunk } from "@reduxjs/toolkit";
import * as attendanceApi from "@/api/attendance";
import * as authApi from "@/api/auth";
import * as departmentsApi from "@/api/departments";
import { loadEverything } from "@/api/load";
import * as membersApi from "@/api/members";
import * as rosterApi from "@/api/roster";
import * as settingsApi from "@/api/settings";

export const loadAll = createAsyncThunk("app/loadAll", async () => ({
  db: await loadEverything(),
  sessionUserId: authApi.getSessionUserId(),
}));

export const signIn = createAsyncThunk("auth/signIn", authApi.signIn);
export const signOut = createAsyncThunk("auth/signOut", authApi.signOut);

export const checkIn = createAsyncThunk("attendance/checkIn", attendanceApi.checkIn);
export const overrideCheckIn = createAsyncThunk(
  "attendance/override",
  (args: { form: Parameters<typeof attendanceApi.overrideCheckIn>[0]; approvedBy: string }) =>
    attendanceApi.overrideCheckIn(args.form, args.approvedBy),
);

export const addAssignment = createAsyncThunk("roster/add", rosterApi.addAssignment);
export const updateAssignment = createAsyncThunk("roster/update", rosterApi.updateAssignment);
export const removeAssignment = createAsyncThunk("roster/remove", rosterApi.removeAssignment);

export const addMember = createAsyncThunk("members/add", membersApi.addMember);
export const updateMember = createAsyncThunk("members/update", membersApi.updateMember);

export const saveSettings = createAsyncThunk("settings/save", settingsApi.saveSettings);

export const addDepartment = createAsyncThunk("departments/add", departmentsApi.addDepartment);
export const updateDepartment = createAsyncThunk(
  "departments/update",
  departmentsApi.updateDepartment,
);
export const removeDepartment = createAsyncThunk(
  "departments/remove",
  departmentsApi.removeDepartment,
);
