import { Flame, Sunrise, Trophy } from "lucide-react";
import LevelBar from "@/components/leaderboard/LevelBar";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { badgesOf, type Standing } from "@/utils/points";

const MyStanding = ({ standing }: { standing: Standing }) => {
  const stats = [
    { icon: Trophy, label: "Rank", value: `#${standing.rank}` },
    { icon: Flame, label: "Streak", value: standing.streak },
    { icon: Sunrise, label: "Early", value: standing.early },
  ];
  const badges = badgesOf(standing);

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-muted">Your points</p>
          <p className="text-4xl font-semibold tracking-tight tabular-nums">{standing.points}</p>
        </div>
        <div className="flex gap-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center">
              <Icon className="mx-auto size-4 text-muted" />
              <p className="font-mono text-sm font-semibold">{value}</p>
              <p className="text-[10px] text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <LevelBar points={standing.points} />
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {badges.map((badge) => (
            <Badge key={badge.label} tone={badge.tone}>
              {badge.label}
            </Badge>
          ))}
        </div>
      )}
    </Card>
  );
};

export default MyStanding;
