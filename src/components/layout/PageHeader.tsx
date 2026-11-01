import type { ReactNode } from "react";

type PageHeaderProps = { title: string; subtitle?: string; action?: ReactNode };

const PageHeader = ({ title, subtitle, action }: PageHeaderProps) => (
  <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
    <div>
      <h1 className="font-serif text-4xl tracking-tight">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
    </div>
    {action}
  </div>
);

export default PageHeader;
