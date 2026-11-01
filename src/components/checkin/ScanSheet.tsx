"use client";

import { useEffect, useEffectEvent } from "react";
import { ScanFace } from "lucide-react";
import Button from "@/components/ui/Button";
import Sheet from "@/components/ui/Sheet";

type ScanSheetProps = { open: boolean; onDone: () => void; onCancel: () => void };

const scanMs = 1400;

const ScanSheet = ({ open, onDone, onCancel }: ScanSheetProps) => {
  const finish = useEffectEvent(onDone);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => finish(), scanMs);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <Sheet open={open} title="Verify it's you" onClose={onCancel}>
      <div className="flex flex-col items-center gap-4 py-4 text-center">
        <div className="relative flex size-28 items-center justify-center overflow-hidden rounded-3xl bg-subtle text-fg">
          <ScanFace className="size-16" strokeWidth={1.25} />
          <span className="scan-line absolute inset-x-3 h-0.5 rounded bg-gold" />
        </div>
        <p className="text-sm text-muted">
          Look at your phone to confirm with Face ID or fingerprint.
          <br />
          <span className="text-xs">(Simulated in demo mode)</span>
        </p>
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Sheet>
  );
};

export default ScanSheet;
