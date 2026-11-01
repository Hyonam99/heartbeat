import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/cn";

const DeltaChip = ({ value }: { value: number }) => {
  const isUp = value >= 0;
  const Icon = isUp ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-medium tabular-nums",
        isUp ? "bg-ok-soft text-ok" : "bg-bad-soft text-bad",
      )}
    >
      <Icon className="size-3" />
      {Math.abs(value)}%
    </span>
  );
};

export default DeltaChip;
