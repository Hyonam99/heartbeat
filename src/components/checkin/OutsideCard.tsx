import { MapPinOff, Wifi } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

type OutsideCardProps = {
  distM: number;
  radiusM: number;
  wifiName: string;
  onWifi: () => void;
  onRetry: () => void;
};

const formatDistance = (distM: number) =>
  distM >= 1000 ? `${(distM / 1000).toFixed(1)} km` : `${distM} m`;

const OutsideCard = ({ distM, radiusM, wifiName, onWifi, onRetry }: OutsideCardProps) => (
  <Card className="flex flex-col items-center gap-3 py-6 text-center">
    <span className="flex size-16 items-center justify-center rounded-full bg-bad-soft text-bad">
      <MapPinOff className="size-8" />
    </span>
    <div>
      <p className="font-semibold">You&apos;re outside the church perimeter</p>
      <p className="text-sm text-muted">
        {formatDistance(distM)} away · must be within {radiusM} m
      </p>
    </div>
    <div className="flex w-full flex-col gap-2">
      <Button variant="outline" onClick={onWifi}>
        <Wifi className="size-4" />
        I&apos;m on &quot;{wifiName}&quot; Wi-Fi
      </Button>
      <Button variant="ghost" onClick={onRetry}>
        Try GPS again
      </Button>
    </div>
    <p className="text-xs text-muted">
      Indoors with weak GPS or phone trouble? Ask your Team Lead for a manual check-in.
    </p>
  </Card>
);

export default OutsideCard;
