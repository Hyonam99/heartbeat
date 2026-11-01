import { z } from "zod";
import { splitRoles } from "@/utils/departments";

export const overrideSchema = z.object({
  userId: z.string().min(1, "Choose a member"),
  serviceId: z.string().min(1, "Choose a service"),
  reason: z.string().trim().min(5, "Give a short reason (at least 5 characters)"),
});

export type OverrideForm = z.infer<typeof overrideSchema>;

export const settingsSchema = z.object({
  churchName: z.string().trim().min(2, "Enter the church name"),
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  radiusM: z.coerce.number().int().min(10, "At least 10 m").max(500, "At most 500 m"),
  wifiName: z.string().trim().min(1, "Enter the Wi-Fi name"),
  lateAfterMin: z.coerce.number().int().min(0).max(120),
});

export type SettingsInput = z.input<typeof settingsSchema>;
export type SettingsForm = z.output<typeof settingsSchema>;

export const memberSchema = z.object({
  name: z.string().trim().min(2, "Enter a name"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?\d{10,14}$/, "Enter a valid phone number"),
  role: z.enum(["member", "lead", "admin"]),
  departments: z.array(z.string()).min(1, "Pick a department"),
});

export type MemberForm = z.infer<typeof memberSchema>;

export const departmentSchema = z.object({
  name: z.string().trim().min(2, "Enter a department name"),
  roles: z.string().refine((value) => splitRoles(value).length > 0, "Add at least one role"),
});

export type DepartmentForm = z.infer<typeof departmentSchema>;
