import ButtonBase from "@mui/material/ButtonBase";
import { Fingerprint } from "lucide-react";
import Spinner from "@/components/ui/Spinner";

type CheckInButtonProps = { isBusy: boolean; label: string; onClick: () => void };

const CheckInButton = ({ isBusy, label, onClick }: CheckInButtonProps) => (
  <div className="flex flex-col items-center gap-4 py-8">
    <ButtonBase
      onClick={onClick}
      disabled={isBusy}
      aria-label={label}
      className="group relative size-48 rounded-full bg-brand text-brand-fg shadow-2xl shadow-black/20 transition active:scale-95"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-brand/15 group-disabled:hidden" />
      <span className="absolute inset-3 rounded-full border border-brand-fg/15" />
      {isBusy ? <Spinner /> : <Fingerprint className="size-20" strokeWidth={1.25} />}
    </ButtonBase>
    <p className="text-sm font-medium">{label}</p>
  </div>
);

export default CheckInButton;
