import Tooltip from "@mui/material/Tooltip";
import Avatar from "@/components/ui/Avatar";
import Card from "@/components/ui/Card";
import type { User } from "@/utils/types";

const AwayGrid = ({ users }: { users: User[] }) => (
  <Card>
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-sm font-semibold">Not here yet</h2>
      <span className="font-mono text-xs text-muted">{users.length}</span>
    </div>
    {users.length === 0 ? (
      <p className="text-sm text-muted">Everyone is here 🎉</p>
    ) : (
      <div className="grid grid-cols-5 gap-3 sm:grid-cols-6 lg:grid-cols-4">
        {users.map((user) => (
          <Tooltip key={user.id} title={user.name}>
            <div className="flex flex-col items-center gap-1">
              <Avatar name={user.name} src={user.photo} className="size-11" />
              <span className="w-full truncate text-center text-[10px] text-muted">
                {user.name.split(" ")[0]}
              </span>
            </div>
          </Tooltip>
        ))}
      </div>
    )}
  </Card>
);

export default AwayGrid;
