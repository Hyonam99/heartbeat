"use client";

import { useState } from "react";
import AttendanceTable from "@/components/admin/AttendanceTable";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import KpiStrip from "@/components/ui/KpiStrip";
import Select from "@/components/ui/Select";
import { useAppSelector } from "@/store";
import {
  selectDepartments,
  selectRecords,
  selectServiceMap,
  selectServices,
  selectUserMap,
} from "@/store/selectors";
import { formatDay, todayKey } from "@/utils/date";
import { isEarly } from "@/utils/points";
import { countStatus, newestFirst, onTimeShare } from "@/utils/stats";

const anyValue = "all";

const statusOptions = [
  { value: "onTime", label: "On time" },
  { value: "late", label: "Late" },
  { value: "override", label: "Admin Verified" },
];

const AttendancePage = () => {
  const services = useAppSelector(selectServices);
  const records = useAppSelector(selectRecords);
  const userMap = useAppSelector(selectUserMap);
  const serviceMap = useAppSelector(selectServiceMap);
  const departments = useAppSelector(selectDepartments);
  const pastServices = services.filter((service) => service.date <= todayKey()).toReversed();

  const [serviceId, setServiceId] = useState(anyValue);
  const [departmentId, setDepartmentId] = useState(anyValue);
  const [status, setStatus] = useState(anyValue);

  const shown = records
    .filter((record) => serviceId === anyValue || record.serviceId === serviceId)
    .filter((record) => status === anyValue || record.status === status)
    .filter(
      (record) =>
        departmentId === anyValue || userMap.get(record.userId)?.departments.includes(departmentId),
    )
    .toSorted(newestFirst);
  const counts = countStatus(shown);
  const earlyCount = shown.filter((record) => {
    const service = serviceMap.get(record.serviceId);
    return !!service && isEarly(record, service);
  }).length;

  const kpis = [
    { label: "Records", value: shown.length, caption: "matching filters" },
    { label: "On-time rate", value: onTimeShare(shown), unit: "%", caption: "incl. verified" },
    { label: "Early birds", value: earlyCount, caption: "30+ min before service" },
    { label: "Late", value: counts.late, caption: "after the grace period" },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="Attendance" subtitle="Every check-in, with how early people arrived." />
      <div className="mb-4">
        <KpiStrip items={kpis} />
      </div>
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <Select
          value={serviceId}
          onChange={(event) => setServiceId(event.target.value)}
          aria-label="Service"
        >
          <option value={anyValue}>All services</option>
          {pastServices.map((service) => (
            <option key={service.id} value={service.id}>
              {formatDay(service.date)}
            </option>
          ))}
        </Select>
        <Select
          value={departmentId}
          onChange={(event) => setDepartmentId(event.target.value)}
          aria-label="Department"
        >
          <option value={anyValue}>All departments</option>
          {departments.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>
        <Select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          aria-label="Status"
        >
          <option value={anyValue}>All statuses</option>
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
      <Card className="overflow-hidden p-0">
        <AttendanceTable records={shown} userMap={userMap} serviceMap={serviceMap} />
      </Card>
    </div>
  );
};

export default AttendancePage;
