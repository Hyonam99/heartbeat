import { AlertTriangle, CheckCircle2 } from "lucide-react";
import Card from "@/components/ui/Card";
import type { Conflict } from "@/utils/types";

const ConflictList = ({ conflicts }: { conflicts: Conflict[] }) => {
  if (conflicts.length === 0) {
    return (
      <Card className="flex items-center gap-2 border-ok/40 bg-ok-soft text-sm text-ok">
        <CheckCircle2 className="size-4" /> No conflicts. This roster is ready to share.
      </Card>
    );
  }

  return (
    <Card className="border-warn/40 bg-warn-soft text-sm text-warn">
      <p className="mb-2 flex items-center gap-2 font-semibold">
        <AlertTriangle className="size-4" /> {conflicts.length} conflict
        {conflicts.length > 1 && "s"} to fix
      </p>
      <ul className="list-inside list-disc space-y-1">
        {conflicts.map((conflict) => (
          <li key={`${conflict.kind}-${conflict.userId ?? ""}-${conflict.departmentId ?? ""}`}>
            {conflict.message}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ConflictList;
