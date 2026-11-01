"use client";

import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ClipboardList } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Empty from "@/components/ui/Empty";
import StatusBadge from "@/components/ui/StatusBadge";
import { useAppSelector } from "@/store";
import { selectDepartmentNames } from "@/store/selectors";
import { formatShortDay, formatTime } from "@/utils/date";
import { pointsFor } from "@/utils/points";
import type { Attendance, Service, User } from "@/utils/types";

type AttendanceTableProps = {
  records: Attendance[];
  userMap: Map<string, User>;
  serviceMap: Map<string, Service>;
};

const methodLabels: Record<Attendance["method"], string> = {
  gps: "GPS",
  wifi: "Wi-Fi",
  override: "Manual",
};

const detailOf = (record: Attendance, userMap: Map<string, User>) => {
  if (record.method === "override") {
    const approver = userMap.get(record.approvedBy ?? "")?.name ?? "Lead";
    return `${approver}: ${record.reason ?? ""}`;
  }
  return record.distM === undefined ? "—" : `${record.distM} m`;
};

const headers = ["Member", "Service", "Arrived", "Method", "Detail", "Status", "Points"];
const pageSize = 10;
const cellClass = "border-line px-3 py-2.5";

const AttendanceTable = ({ records, userMap, serviceMap }: AttendanceTableProps) => {
  const [page, setPage] = useState(0);
  const departmentNames = useAppSelector(selectDepartmentNames);
  const lastPage = Math.max(0, Math.ceil(records.length / pageSize) - 1);
  const current = Math.min(page, lastPage);

  if (records.length === 0)
    return <Empty icon={ClipboardList} text="No records match these filters." />;

  return (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header} className={`${cellClass} text-xs text-muted`}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {records.slice(current * pageSize, (current + 1) * pageSize).map((record) => {
              const user = userMap.get(record.userId);
              const service = serviceMap.get(record.serviceId);
              return (
                <TableRow key={record.id} hover>
                  <TableCell className={cellClass}>
                    <div className="flex items-center gap-2.5">
                      <Avatar name={user?.name ?? "?"} src={user?.photo} className="size-8" />
                      <div>
                        <p className="whitespace-nowrap font-medium">{user?.name}</p>
                        <p className="text-xs text-muted">
                          {user && departmentNames(user.departments)}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className={`${cellClass} whitespace-nowrap`}>
                    {service && formatShortDay(service.date)}
                  </TableCell>
                  <TableCell className={`${cellClass} font-mono`}>
                    {formatTime(record.time)}
                  </TableCell>
                  <TableCell className={cellClass}>{methodLabels[record.method]}</TableCell>
                  <TableCell className={`${cellClass} max-w-56 truncate text-muted`}>
                    {detailOf(record, userMap)}
                  </TableCell>
                  <TableCell className={cellClass}>
                    <StatusBadge status={record.status} />
                  </TableCell>
                  <TableCell className={`${cellClass} font-mono`}>
                    {service && `+${pointsFor(record, service)}`}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={records.length}
        page={current}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[pageSize]}
        onPageChange={(_, next) => setPage(next)}
        className="text-muted"
      />
    </>
  );
};

export default AttendanceTable;
