export const splitRoles = (value: string) =>
  value
    .split(/[,\n]/)
    .map((role) => role.trim())
    .filter(Boolean);
