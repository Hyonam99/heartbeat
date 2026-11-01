import { HeartPulse } from "lucide-react";

const Logo = () => (
  <span className="flex items-center gap-2 font-semibold">
    <span className="flex size-8 items-center justify-center rounded-lg bg-brand text-brand-fg">
      <HeartPulse className="size-4" />
    </span>
    Heartbeat
  </span>
);

export default Logo;
