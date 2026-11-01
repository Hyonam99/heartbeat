"use client";

import type { ReactNode } from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import { X } from "lucide-react";

type SheetProps = { open: boolean; title: string; onClose: () => void; children: ReactNode };

const Sheet = ({ open, title, onClose, children }: SheetProps) => (
  <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth="xs"
    aria-label={title}
    slotProps={{ paper: { className: "m-3 w-full rounded-3xl p-5" } }}
  >
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold">{title}</h2>
      <IconButton size="small" aria-label="Close" onClick={onClose}>
        <X className="size-5" />
      </IconButton>
    </div>
    {children}
  </Dialog>
);

export default Sheet;
