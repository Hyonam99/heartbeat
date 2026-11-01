"use client";

import { CalendarDays, Star } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Empty from "@/components/ui/Empty";
import { useAppSelector } from "@/store";
import {
  selectAssignments,
  selectCurrentUser,
  selectDepartmentMap,
  selectUpcoming,
} from "@/store/selectors";
import { formatDay } from "@/utils/date";

const DutiesPage = () => {
  const user = useAppSelector(selectCurrentUser);
  const upcoming = useAppSelector(selectUpcoming);
  const assignments = useAppSelector(selectAssignments);
  const departmentMap = useAppSelector(selectDepartmentMap);

  const duties = upcoming.flatMap((service) =>
    assignments
      .filter((slot) => slot.serviceId === service.id && slot.userId === user?.id)
      .map((slot) => ({ slot, service })),
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="pt-2 font-serif text-4xl tracking-tight">My duties</h1>
      {duties.length === 0 ? (
        <Empty icon={CalendarDays} text="You have no upcoming assignments." />
      ) : (
        duties.map(({ slot, service }) => (
          <Card key={slot.id} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="font-medium">{formatDay(service.date)}</p>
              {slot.isLead && (
                <Badge tone="gold" icon={<Star className="size-3" />}>
                  Shift lead
                </Badge>
              )}
            </div>
            <p className="text-sm">
              {departmentMap.get(slot.departmentId)?.name ?? "Department"} · {slot.role}
            </p>
            <p className="font-mono text-xs text-muted">
              {service.name} · Call time {service.callTime} · Service {service.startTime}
            </p>
          </Card>
        ))
      )}
    </div>
  );
};

export default DutiesPage;
