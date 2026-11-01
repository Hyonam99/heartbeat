import { delay, newId, updateDb } from "@/api/db";
import type { Department } from "@/utils/types";

export const addDepartment = async (input: Omit<Department, "id">) => {
  await delay();
  const department: Department = { ...input, id: newId("d") };
  updateDb((db) => db.departments.push(department));
  return department;
};

export const updateDepartment = async (department: Department) => {
  await delay();
  updateDb((db) => {
    db.departments = db.departments.map((item) => (item.id === department.id ? department : item));
    db.assignments = db.assignments.filter(
      (slot) => slot.departmentId !== department.id || department.roles.includes(slot.role),
    );
  });
  return department;
};

export const removeDepartment = async (id: string) => {
  await delay();
  updateDb((db) => {
    db.departments = db.departments.filter((item) => item.id !== id);
    db.users = db.users.map((user) => ({
      ...user,
      departments: user.departments.filter((item) => item !== id),
    }));
    db.assignments = db.assignments.filter((slot) => slot.departmentId !== id);
  });
  return id;
};
