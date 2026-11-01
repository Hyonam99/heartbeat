import type { Attendance } from "@/utils/types";

export const percent = (part: number, total: number) =>
  total === 0 ? "—" : `${Math.round((part / total) * 100)}%`;

const suffixes = ["th", "st", "nd", "rd"];

export const ordinal = (value: number) => {
  const tail = value % 100;
  return `${value}${suffixes[(tail - 20) % 10] ?? suffixes[tail] ?? suffixes[0]}`;
};

export const countStatus = (records: Attendance[]) => ({
  onTime: records.filter((record) => record.status === "onTime").length,
  late: records.filter((record) => record.status === "late").length,
  override: records.filter((record) => record.status === "override").length,
});

export const newestFirst = (a: Attendance, b: Attendance) => b.time.localeCompare(a.time);

export const changeOf = (current: number, previous: number) =>
  previous === 0 ? null : Math.round(((current - previous) / previous) * 100);

export const onTimeShare = (records: Attendance[]) => {
  const counts = countStatus(records);
  return records.length === 0
    ? 0
    : Math.round(((counts.onTime + counts.override) / records.length) * 100);
};
