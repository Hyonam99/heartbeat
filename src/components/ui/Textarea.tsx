import type { Ref } from "react";
import OutlinedInput, { type OutlinedInputProps } from "@mui/material/OutlinedInput";

type TextareaProps = Omit<OutlinedInputProps, "ref"> & { ref?: Ref<HTMLTextAreaElement> };

const Textarea = ({ ref, ...props }: TextareaProps) => (
  <OutlinedInput multiline minRows={3} fullWidth inputRef={ref} className="bg-card" {...props} />
);

export default Textarea;
