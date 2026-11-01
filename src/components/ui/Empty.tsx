import type { LucideIcon } from "lucide-react";

const Empty = ({ icon: Icon, text }: { icon: LucideIcon; text: string }) => (
  <div className="flex flex-col items-center gap-2 py-10 text-center text-sm text-muted">
    <span className="flex size-12 items-center justify-center rounded-2xl bg-subtle">
      <Icon className="size-5" />
    </span>
    {text}
  </div>
);

export default Empty;
