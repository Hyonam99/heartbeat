"use client";

import { useState, type RefObject } from "react";
import { FileDown, ImageDown } from "lucide-react";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { exportImage, exportPdf } from "@/utils/export";

type ExportKind = "png" | "jpeg" | "pdf";

type ExportMenuProps = { sheetRef: RefObject<HTMLDivElement | null>; fileName: string };

const options: { kind: ExportKind; label: string }[] = [
  { kind: "pdf", label: "PDF" },
  { kind: "png", label: "PNG" },
  { kind: "jpeg", label: "JPEG" },
];

const ExportMenu = ({ sheetRef, fileName }: ExportMenuProps) => {
  const [busyKind, setBusyKind] = useState<ExportKind | null>(null);

  const handleExport = async (kind: ExportKind) => {
    const node = sheetRef.current;
    if (!node) return;
    setBusyKind(kind);
    try {
      if (kind === "pdf") await exportPdf(node, fileName);
      else await exportImage(node, kind, fileName);
    } finally {
      setBusyKind(null);
    }
  };

  return (
    <div className="flex gap-2">
      {options.map(({ kind, label }) => (
        <Button
          key={kind}
          variant={kind === "pdf" ? "primary" : "outline"}
          size="sm"
          disabled={!!busyKind}
          onClick={() => handleExport(kind)}
        >
          {busyKind === kind && <Spinner />}
          {busyKind !== kind &&
            (kind === "pdf" ? <FileDown className="size-4" /> : <ImageDown className="size-4" />)}
          {label}
        </Button>
      ))}
    </div>
  );
};

export default ExportMenu;
