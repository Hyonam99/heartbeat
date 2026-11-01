import type { Ref } from "react";
import NativeSelect, { type NativeSelectProps } from "@mui/material/NativeSelect";
import OutlinedInput from "@mui/material/OutlinedInput";
import { cn } from "@/utils/cn";

type SelectProps = Omit<NativeSelectProps, "ref"> & { ref?: Ref<HTMLSelectElement> };

const Select = ({ ref, className, ...props }: SelectProps) => (
  <NativeSelect
    input={<OutlinedInput size="small" />}
    inputRef={ref}
    fullWidth
    className={cn("bg-card", className)}
    {...props}
  />
);

export default Select;
