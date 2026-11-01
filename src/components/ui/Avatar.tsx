import MuiAvatar from "@mui/material/Avatar";
import { cn } from "@/utils/cn";

const gradients = [
  "from-amber-800 to-orange-950",
  "from-rose-800 to-pink-950",
  "from-sky-800 to-indigo-950",
  "from-emerald-800 to-teal-950",
  "from-violet-800 to-fuchsia-950",
  "from-lime-800 to-green-950",
];

export const initialsOf = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

export const gradientOf = (name: string) => {
  const sum = [...name].reduce((total, char) => total + char.charCodeAt(0), 0);
  return gradients[sum % gradients.length];
};

type AvatarProps = { name: string; src?: string; className?: string };

const Avatar = ({ name, src, className }: AvatarProps) => (
  <MuiAvatar
    src={src}
    alt={name}
    className={cn(
      "size-9 bg-linear-to-br text-xs font-semibold text-white",
      gradientOf(name),
      className,
    )}
  >
    {initialsOf(name)}
  </MuiAvatar>
);

export default Avatar;
