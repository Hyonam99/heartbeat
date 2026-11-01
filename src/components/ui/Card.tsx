import Paper, { type PaperProps } from "@mui/material/Paper";
import { cn } from "@/utils/cn";

const Card = ({ className, ...props }: PaperProps) => (
  <Paper variant="outlined" className={cn("rounded-2xl p-4", className)} {...props} />
);

export default Card;
