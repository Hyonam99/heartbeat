import LinearProgress from "@mui/material/LinearProgress";
import { levelOf } from "@/utils/points";

const LevelBar = ({ points }: { points: number }) => {
  const level = levelOf(points);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-medium">
          Lv {level.number} · {level.name}
        </span>
        <span className="font-mono text-muted">
          {level.next ? `${level.next.min - points} pts to ${level.next.name}` : "Max level"}
        </span>
      </div>
      <LinearProgress
        variant="determinate"
        value={level.progress}
        className="h-1.5 rounded-full bg-subtle [&_.MuiLinearProgress-bar]:rounded-full [&_.MuiLinearProgress-bar]:bg-gold"
      />
    </div>
  );
};

export default LevelBar;
