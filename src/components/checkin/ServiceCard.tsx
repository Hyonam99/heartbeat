import { CalendarClock } from "lucide-react";
import Card from "@/components/ui/Card";
import { formatDay } from "@/utils/date";
import type { Service } from "@/utils/types";

const ServiceCard = ({ service }: { service: Service }) => (
  <Card className="flex items-center gap-3">
    <span className="flex size-10 items-center justify-center rounded-lg bg-brand text-brand-fg">
      <CalendarClock className="size-5" />
    </span>
    <div className="text-sm">
      <p className="font-medium">{service.name}</p>
      <p className="text-muted">
        {formatDay(service.date)} · Call {service.callTime} · Starts {service.startTime}
      </p>
    </div>
  </Card>
);

export default ServiceCard;
