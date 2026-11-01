import { delay, newId, updateDb } from "@/api/db";
import type { MemberForm } from "@/utils/schemas";
import type { User } from "@/utils/types";

export const addMember = async (form: MemberForm) => {
  await delay();
  const user: User = { ...form, id: newId("u"), hasPasskey: false };
  updateDb((db) => db.users.push(user));
  return user;
};

export const updateMember = async (user: User) => {
  await delay();
  updateDb((db) => {
    db.users = db.users.map((item) => (item.id === user.id ? user : item));
  });
  return user;
};
