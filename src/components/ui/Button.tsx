import MuiButton, { type ButtonProps as MuiButtonProps } from "@mui/material/Button";

type Variant = "primary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

type ButtonProps = Omit<MuiButtonProps, "variant" | "size" | "color"> & {
  variant?: Variant;
  size?: Size;
};

const variants: Record<Variant, Pick<MuiButtonProps, "variant" | "color">> = {
  primary: { variant: "contained", color: "primary" },
  outline: { variant: "outlined", color: "inherit" },
  ghost: { variant: "text", color: "inherit" },
  danger: { variant: "contained", color: "error" },
};

const sizes: Record<Size, MuiButtonProps["size"]> = { sm: "small", md: "medium", lg: "large" };

const Button = ({ variant = "primary", size = "md", ...props }: ButtonProps) => (
  <MuiButton {...variants[variant]} size={sizes[size]} {...props} />
);

export default Button;
