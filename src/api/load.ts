import { delay, readDb } from "@/api/db";

export const loadEverything = async () => {
  await delay(150);
  return readDb();
};
