import type { Ref } from "react";
import OutlinedInput, { type OutlinedInputProps } from "@mui/material/OutlinedInput";

type InputProps = Omit<OutlinedInputProps, "ref"> & {
  ref?: Ref<HTMLInputElement>;
  inputMode?: "text" | "tel" | "decimal" | "numeric";
};

const Input = ({ ref, inputMode, ...props }: InputProps) => (
  <OutlinedInput
    size="small"
    fullWidth
    inputRef={ref}
    slotProps={{ input: { inputMode } }}
    className="bg-card"
    {...props}
  />
);

export default Input;
