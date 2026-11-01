import { CalendarCheck, Flame, Sunrise } from "lucide-react";
import { cn } from "@/utils/cn";
import type { Standing } from "@/utils/points";
import { percent } from "@/utils/stats";

type StatTrioProps = { standing: Standing; isStacked?: boolean; className?: string };

const StatTrio = ({ standing, isStacked, className }: StatTrioProps) => {
  const stats = [
    { icon: CalendarCheck, label: "Attendance", value: percent(standing.attended, standing.total) },
    { icon: Sunrise, label: "Early", value: standing.early },
    { icon: Flame, label: "Streak", value: standing.streak },
  ];
  return (
    <ul className={cn("flex", isStacked ? "flex-col gap-1.5" : "gap-5", className)}>
      {stats.map(({ icon: Icon, label, value }) => (
        <li
          key={label}
          title={label}
          className={cn("flex items-center gap-1.5", !isStacked && "md:flex-col md:gap-0")}
        >
          <Icon className={cn("size-3.5 text-amber-300/80", !isStacked && "md:hidden")} />
          <span className="font-mono text-sm font-semibold tabular-nums text-white">{value}</span>
          <span
            className={cn(
              "text-[10px] tracking-wider text-white/55 uppercase",
              !isStacked && "hidden md:inline",
            )}
          >
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default StatTrio;
