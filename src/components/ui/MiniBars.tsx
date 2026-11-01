import { cn } from "@/utils/cn";

const MiniBars = ({ values }: { values: number[] }) => {
  const max = Math.max(...values, 1);
  return (
    <div className="flex h-7 items-end gap-0.5" aria-hidden>
      {values.map((value, index) => (
        <span
          key={index}
          className={cn("w-1.5 rounded-sm", index === values.length - 1 ? "bg-fg" : "bg-line")}
          style={{ height: `${Math.max((value / max) * 100, 8)}%` }}
        />
      ))}
    </div>
  );
};

export default MiniBars;
