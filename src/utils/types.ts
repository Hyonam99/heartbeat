export type Role = "member" | "lead" | "admin";

export type Department = { id: string; name: string; roles: string[] };

export type User = {
  id: string;
  name: string;
  phone: string;
  role: Role;
  departments: string[];
  hasPasskey: boolean;
  photo?: string;
};

export type Service = {
  id: string;
  date: string;
  name: string;
  startTime: string;
  callTime: string;
};

export type AttendanceStatus = "onTime" | "late" | "override";

export type CheckInMethod = "gps" | "wifi" | "override";

export type Attendance = {
  id: string;
  userId: string;
  serviceId: string;
  time: string;
  status: AttendanceStatus;
  method: CheckInMethod;
  distM?: number;
  reason?: string;
  approvedBy?: string;
};

export type Assignment = {
  id: string;
  serviceId: string;
  userId: string;
  departmentId: string;
  role: string;
  isLead: boolean;
};

export type Settings = {
  churchName: string;
  lat: number;
  lng: number;
  radiusM: number;
  wifiName: string;
  lateAfterMin: number;
};

export type Conflict = {
  kind: "double" | "noLead" | "wrongDepartment";
  message: string;
  userId?: string;
  departmentId?: string;
};
