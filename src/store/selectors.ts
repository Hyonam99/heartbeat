import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { todayKey } from "@/utils/date";
import { rankStandings } from "@/utils/points";

export const selectDepartments = (state: RootState) => state.departments.list;
export const selectUsers = (state: RootState) => state.members.users;
export const selectServices = (state: RootState) => state.roster.services;
export const selectAssignments = (state: RootState) => state.roster.assignments;
export const selectRecords = (state: RootState) => state.attendance.records;
export const selectSettings = (state: RootState) => state.settings;

export const selectCurrentUser = createSelector(
  [selectUsers, (state: RootState) => state.auth.userId],
  (users, userId) => users.find((user) => user.id === userId) ?? null,
);

export const selectTodayService = createSelector(
  [selectServices],
  (services) => services.find((service) => service.date === todayKey()) ?? null,
);

export const selectUpcoming = createSelector([selectServices], (services) =>
  services.filter((service) => service.date > todayKey()),
);

export const selectUserMap = createSelector(
  [selectUsers],
  (users) => new Map(users.map((user) => [user.id, user])),
);

export const selectServiceMap = createSelector(
  [selectServices],
  (services) => new Map(services.map((service) => [service.id, service])),
);

export const selectStandings = createSelector(
  [selectUsers, selectServices, selectRecords],
  (users, services, records) => rankStandings(users, services, records, todayKey()),
);

export const selectDepartmentMap = createSelector(
  [selectDepartments],
  (departments) => new Map(departments.map((department) => [department.id, department])),
);

export const selectDepartmentNames = createSelector(
  [selectDepartmentMap],
  (map) => (ids: string[]) =>
    ids
      .map((id) => map.get(id)?.name)
      .filter(Boolean)
      .join(", "),
);
