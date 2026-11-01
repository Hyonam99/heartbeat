import type { ReactNode } from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

type FieldProps = { label: string; error?: string; children: ReactNode };

const Field = ({ label, error, children }: FieldProps) => (
  <FormControl component="label" fullWidth error={!!error} className="gap-1.5">
    <span className="text-sm font-medium text-fg">{label}</span>
    {children}
    {error && <FormHelperText className="m-0">{error}</FormHelperText>}
  </FormControl>
);

export default Field;
