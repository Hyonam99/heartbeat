import { delay, readDb } from "@/api/db";

const sessionKey = "heartbeat-session";

export const getSessionUserId = () => {
  try {
    return localStorage.getItem(sessionKey);
  } catch {
    return null;
  }
};

export const signIn = async (userId: string) => {
  await delay();
  const user = readDb().users.find((item) => item.id === userId);
  if (!user) throw new Error("User not found");
  localStorage.setItem(sessionKey, userId);
  return user.id;
};

export const signOut = async () => {
  localStorage.removeItem(sessionKey);
};
