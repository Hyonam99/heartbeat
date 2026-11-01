import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Star } from "lucide-react";
import Select from "@/components/ui/Select";
import { cn } from "@/utils/cn";
import type { Assignment, User } from "@/utils/types";

type SlotRowProps = {
  role: string;
  slot?: Assignment;
  members: User[];
  others: User[];
  hasIssue: boolean;
  onPick: (userId: string) => void;
  onToggleLead: () => void;
};

const leadHint = (slot?: Assignment) => {
  if (!slot) return "Assign someone first, then you can make them shift lead";
  return slot.isLead ? "Shift lead: tap to remove" : "Make shift lead";
};

const SlotRow = ({ role, slot, members, others, hasIssue, onPick, onToggleLead }: SlotRowProps) => (
  <div className="flex items-center gap-2">
    <span className="w-24 shrink-0 text-sm text-muted sm:w-32">{role}</span>
    <Select
      aria-label={role}
      value={slot?.userId ?? ""}
      onChange={(event) => onPick(event.target.value)}
      className={cn("h-9 min-w-0 flex-1", hasIssue && "border-bad")}
    >
      <option value="">Unassigned</option>
      <optgroup label="This department">
        {members.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </optgroup>
      <optgroup label="Other departments">
        {others.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </optgroup>
    </Select>
    <Tooltip title={leadHint(slot)} arrow>
      <span>
        <IconButton
          size="small"
          aria-label="Shift lead"
          aria-pressed={!!slot?.isLead}
          disabled={!slot}
          onClick={onToggleLead}
          className={cn(slot?.isLead ? "bg-gold-soft text-gold" : "text-muted")}
        >
          <Star className={cn("size-4", slot?.isLead && "fill-current")} />
        </IconButton>
      </span>
    </Tooltip>
  </div>
);

export default SlotRow;
