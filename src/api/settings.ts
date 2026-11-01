import { delay, resetDb, updateDb } from "@/api/db";
import type { Settings } from "@/utils/types";

export const saveSettings = async (settings: Settings) => {
  await delay();
  updateDb((db) => {
    db.settings = settings;
  });
  return settings;
};

export const resetDemoData = async () => {
  await delay();
  resetDb();
};
