import {
  buildAssignments,
  buildAttendance,
  buildServices,
  makeService,
  seedDepartments,
  seedSettings,
  seedUsers,
} from "@/constants/seed";
import { todayKey } from "@/utils/date";
import type { Assignment, Attendance, Department, Service, Settings, User } from "@/utils/types";

export type MockDb = {
  departments: Department[];
  users: User[];
  services: Service[];
  attendance: Attendance[];
  assignments: Assignment[];
  settings: Settings;
};

const dbKey = "heartbeat-db-v5";

const createDb = (): MockDb => {
  const services = buildServices();
  return {
    departments: seedDepartments,
    users: seedUsers,
    services,
    attendance: buildAttendance(services),
    assignments: buildAssignments(services),
    settings: seedSettings,
  };
};

const readStorage = (): MockDb | null => {
  try {
    const raw = localStorage.getItem(dbKey);
    return raw ? (JSON.parse(raw) as MockDb) : null;
  } catch {
    return null;
  }
};

export const readDb = (): MockDb => {
  const db = readStorage() ?? createDb();
  if (!db.services.some((service) => service.date === todayKey())) {
    db.services.push(makeService(new Date(), db.services.length));
    db.services.sort((a, b) => a.date.localeCompare(b.date));
  }
  writeDb(db);
  return db;
};

export const writeDb = (db: MockDb) => {
  try {
    localStorage.setItem(dbKey, JSON.stringify(db));
  } catch {
    return;
  }
};

export const updateDb = (change: (db: MockDb) => void) => {
  const db = readDb();
  change(db);
  writeDb(db);
  return db;
};

export const resetDb = () => {
  const fresh = createDb();
  writeDb(fresh);
  return fresh;
};

export const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export const newId = (prefix: string) => `${prefix}${Date.now().toString(36)}`;
