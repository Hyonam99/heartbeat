import type { ReactNode } from "react";
import Card from "@/components/ui/Card";
import DeltaChip from "@/components/ui/DeltaChip";

export type Kpi = {
  label: string;
  value: string | number;
  unit?: string;
  delta?: number | null;
  caption?: string;
  visual?: ReactNode;
};

const KpiStrip = ({ items }: { items: Kpi[] }) => (
  <Card className="grid grid-cols-2 gap-px overflow-hidden bg-line p-0 lg:grid-cols-4">
    {items.map((item) => (
      <div key={item.label} className="flex flex-col gap-2 bg-card p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-muted">{item.label}</span>
          {item.delta != null && <DeltaChip value={item.delta} />}
        </div>
        <div className="flex items-end justify-between gap-2">
          <p className="text-3xl font-semibold tracking-tight tabular-nums">
            {item.value}
            {item.unit && (
              <span className="ml-0.5 text-lg font-normal text-muted">{item.unit}</span>
            )}
          </p>
          {item.visual}
        </div>
        {item.caption && <span className="text-[11px] text-muted">{item.caption}</span>}
      </div>
    ))}
  </Card>
);

export default KpiStrip;
