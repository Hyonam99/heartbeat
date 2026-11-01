import LinearProgress from "@mui/material/LinearProgress";
import type { Attendance, Department, User } from "@/utils/types";

type DepartmentProgressProps = { departments: Department[]; users: User[]; records: Attendance[] };

const DepartmentProgress = ({ departments, users, records }: DepartmentProgressProps) => {
  const presentIds = new Set(records.map((record) => record.userId));

  return (
    <div className="flex flex-col gap-4">
      {departments.map(({ id, name }) => {
        const members = users.filter((user) => user.departments.includes(id));
        const present = members.filter((user) => presentIds.has(user.id)).length;
        const value = members.length ? (present / members.length) * 100 : 0;
        return (
          <div key={id} className="text-sm">
            <div className="mb-1.5 flex justify-between">
              <span>{name}</span>
              <span className="font-mono text-xs text-muted">
                {present}/{members.length}
              </span>
            </div>
            <LinearProgress
              variant="determinate"
              value={value}
              className="h-1.5 rounded-full bg-subtle [&_.MuiLinearProgress-bar]:rounded-full [&_.MuiLinearProgress-bar]:bg-fg"
            />
          </div>
        );
      })}
    </div>
  );
};

export default DepartmentProgress;
