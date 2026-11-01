import Link from "next/link";
import { ChevronRight, Flame, Trophy } from "lucide-react";
import LevelBar from "@/components/leaderboard/LevelBar";
import Card from "@/components/ui/Card";
import routePath from "@/constants/route.json";
import type { Standing } from "@/utils/points";

const StandingStrip = ({ standing }: { standing: Standing }) => (
  <Link href={routePath.Member.Leaderboard}>
    <Card className="flex flex-col gap-3 transition hover:border-fg/30">
      <div className="flex items-center gap-4 text-sm">
        <span className="flex items-center gap-1.5">
          <Trophy className="size-4 text-gold" />
          <span className="font-mono font-semibold">#{standing.rank}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Flame className="size-4 text-warn" />
          <span className="font-mono">{standing.streak}</span>
          <span className="text-muted">week streak</span>
        </span>
        <span className="ml-auto flex items-center font-mono font-semibold">
          {standing.points} pts
          <ChevronRight className="size-4 text-muted" />
        </span>
      </div>
      <LevelBar points={standing.points} />
    </Card>
  </Link>
);

export default StandingStrip;
