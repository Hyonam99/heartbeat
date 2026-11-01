import type { Assignment, Conflict, Department, User } from "@/utils/types";

export const findConflicts = (
  assignments: Assignment[],
  users: User[],
  departments: Department[],
): Conflict[] => {
  const conflicts: Conflict[] = [];
  const nameOf = (id: string) => users.find((user) => user.id === id)?.name ?? "Unknown";

  const countByUser = new Map<string, number>();
  assignments.forEach((slot) =>
    countByUser.set(slot.userId, (countByUser.get(slot.userId) ?? 0) + 1),
  );
  countByUser.forEach((count, userId) => {
    if (count > 1) {
      conflicts.push({
        kind: "double",
        userId,
        message: `${nameOf(userId)} is assigned ${count} times`,
      });
    }
  });

  departments.forEach(({ id, name }) => {
    const slots = assignments.filter((slot) => slot.departmentId === id);
    if (slots.length > 0 && !slots.some((slot) => slot.isLead)) {
      conflicts.push({ kind: "noLead", departmentId: id, message: `${name} has no shift lead` });
    }
  });

  assignments.forEach((slot) => {
    const user = users.find((item) => item.id === slot.userId);
    const department = departments.find((item) => item.id === slot.departmentId);
    if (user && department && !user.departments.includes(slot.departmentId)) {
      conflicts.push({
        kind: "wrongDepartment",
        userId: slot.userId,
        departmentId: slot.departmentId,
        message: `${user.name} is not in the ${department.name} department`,
      });
    }
  });

  return conflicts;
};
