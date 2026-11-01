import { format, parseISO } from "date-fns";

export const todayKey = () => format(new Date(), "yyyy-MM-dd");

export const formatDay = (date: string) => format(parseISO(date), "EEE, d MMM yyyy");

export const formatShortDay = (date: string) => format(parseISO(date), "d MMM");

export const formatClock = (iso: string) => format(parseISO(iso), "h:mm a");

export const toDateTime = (date: string, time: string) => parseISO(`${date}T${time}`);

export const formatTime = (iso: string) => format(parseISO(iso), "HH:mm");
