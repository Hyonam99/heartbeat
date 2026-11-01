import { useId } from "react";
import { ordinal } from "@/utils/stats";

export type Place = 1 | 2 | 3;

const metals: Record<Place, [string, string, string]> = {
  1: ["#ffe7b0", "#f59e0b", "#7c2d12"],
  2: ["#fafafa", "#a1a1aa", "#3f3f46"],
  3: ["#ffe4e6", "#c98a86", "#5b2a2e"],
};

const handle =
  "M26 16 C12 16 6 26 8 36 C10 48 21 55 31 55 L31 48 C23 48 16 43 15 35 C14 28 18 23 26 23 Z";

const Trophy = ({ place, className }: { place: Place; className?: string }) => {
  const id = useId();
  const [light, mid, dark] = metals[place];
  return (
    <svg viewBox="0 0 100 120" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={light} />
          <stop offset="0.45" stopColor={mid} />
          <stop offset="1" stopColor={dark} />
        </linearGradient>
      </defs>
      <g fill={`url(#${id})`}>
        <path d={handle} />
        <path d={handle} transform="matrix(-1 0 0 1 100 0)" />
        <path d="M24 8 H76 V38 C76 57 64 70 50 70 C36 70 24 57 24 38 Z" />
        <rect x="45" y="68" width="10" height="14" />
        <path d="M36 82 H64 L69 95 H31 Z" />
        <rect x="24" y="95" width="52" height="15" rx="3" />
      </g>
      <path d="M30 12 H38 V40 C38 52 42 60 47 65 C37 62 30 52 30 40 Z" fill="#fff" opacity="0.3" />
      <text
        x="50"
        y="45"
        textAnchor="middle"
        fontSize="19"
        fontWeight="800"
        fill={dark}
        className="font-display"
      >
        {ordinal(place)}
      </text>
    </svg>
  );
};

export default Trophy;
