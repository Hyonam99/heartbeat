import { delay, newId, readDb, updateDb, type MockDb } from "@/api/db";
import { toDateTime } from "@/utils/date";
import type { OverrideForm } from "@/utils/schemas";
import type { Attendance, CheckInMethod } from "@/utils/types";

type CheckInInput = {
  userId: string;
  serviceId: string;
  method: Exclude<CheckInMethod, "override">;
  distM?: number;
};

const assertNotCheckedIn = (db: MockDb, userId: string, serviceId: string) => {
  const exists = db.attendance.some(
    (record) => record.userId === userId && record.serviceId === serviceId,
  );
  if (exists) throw new Error("Already checked in for this service");
};

export const checkIn = async (input: CheckInInput) => {
  await delay(400);
  const db = readDb();
  assertNotCheckedIn(db, input.userId, input.serviceId);
  const service = db.services.find((item) => item.id === input.serviceId);
  if (!service) throw new Error("No service found for today");
  if (input.method === "gps" && (input.distM ?? Infinity) > db.settings.radiusM) {
    throw new Error("You are outside the church perimeter");
  }

  const serverTime = new Date();
  const lateAt = toDateTime(service.date, service.startTime);
  lateAt.setMinutes(lateAt.getMinutes() + db.settings.lateAfterMin);

  const record: Attendance = {
    id: newId("a"),
    ...input,
    time: serverTime.toISOString(),
    status: serverTime > lateAt ? "late" : "onTime",
  };
  updateDb((draft) => draft.attendance.push(record));
  return record;
};

export const overrideCheckIn = async (form: OverrideForm, approvedBy: string) => {
  await delay();
  assertNotCheckedIn(readDb(), form.userId, form.serviceId);
  const record: Attendance = {
    id: newId("a"),
    userId: form.userId,
    serviceId: form.serviceId,
    time: new Date().toISOString(),
    status: "override",
    method: "override",
    reason: form.reason,
    approvedBy,
  };
  updateDb((draft) => draft.attendance.push(record));
  return record;
};
