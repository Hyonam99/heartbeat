import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { cn } from "@/utils/cn";

type Tone = "brand" | "gold";

type SegmentedProps<T extends string> = {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  label: string;
  tone?: Tone;
};

const groupTones: Record<Tone, string> = {
  brand: "bg-card",
  gold: "bg-white/10 ring-1 ring-white/10",
};

const itemTones: Record<Tone, string> = {
  brand: "normal-case text-muted [&.Mui-selected]:bg-brand [&.Mui-selected]:text-brand-fg",
  gold: "font-semibold tracking-widest text-white/70 uppercase [&.Mui-selected]:bg-amber-400 [&.Mui-selected]:text-zinc-950 [&.Mui-selected:hover]:bg-amber-300",
};

const Segmented = <T extends string>({
  value,
  options,
  onChange,
  label,
  tone = "brand",
}: SegmentedProps<T>) => (
  <ToggleButtonGroup
    exclusive
    size="small"
    value={value}
    aria-label={label}
    onChange={(_, next: T | null) => next && onChange(next)}
    className={cn(
      "rounded-full p-0.5 [&_.MuiToggleButtonGroup-grouped]:rounded-full [&_.MuiToggleButtonGroup-grouped]:border-0",
      groupTones[tone],
    )}
  >
    {options.map((option) => (
      <ToggleButton
        key={option.value}
        value={option.value}
        className={cn("px-3 py-1 text-xs", itemTones[tone])}
      >
        {option.label}
      </ToggleButton>
    ))}
  </ToggleButtonGroup>
);

export default Segmented;
