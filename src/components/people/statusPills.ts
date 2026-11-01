import type { Pill } from "@/components/people/PersonCard";
import type { AttendanceStatus } from "@/utils/types";

export const statusPills: Record<AttendanceStatus, Pill> = {
  onTime: { label: "On time", dot: "bg-green-500" },
  late: { label: "Late", dot: "bg-orange-500" },
  override: { label: "Verified", dot: "bg-sky-500" },
};

export const awayPill: Pill = { label: "Not in yet", dot: "bg-zinc-400" };
