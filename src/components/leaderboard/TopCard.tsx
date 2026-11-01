import Link from "next/link";
import { ArrowUpRight, Crown } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Card from "@/components/ui/Card";
import routePath from "@/constants/route.json";
import { useAppSelector } from "@/store";
import { selectDepartmentNames } from "@/store/selectors";
import { levelOf, type Standing } from "@/utils/points";
import { percent } from "@/utils/stats";

const TopCard = ({ standing }: { standing: Standing }) => {
  const { user } = standing;
  const departmentNames = useAppSelector(selectDepartmentNames);
  const stats = [
    { label: "Points", value: standing.points },
    { label: "Streak", value: standing.streak },
    { label: "Rate", value: percent(standing.attended, standing.total) },
  ];

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Top performer</h2>
        <Link
          href={routePath.Admin.Leaderboard}
          className="flex items-center gap-0.5 text-xs text-muted hover:text-fg"
        >
          Leaderboard <ArrowUpRight className="size-3" />
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar name={user.name} src={user.photo} className="size-12 text-sm" />
          <Crown className="absolute -top-2 -right-1 size-4 rotate-12 text-gold" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{user.name}</p>
          <p className="truncate text-xs text-muted">{departmentNames(user.departments)}</p>
        </div>
        <span className="rounded-full bg-gold-soft px-2 py-0.5 font-mono text-[11px] text-gold">
          Lv {levelOf(standing.points).number}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-line">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card p-2 text-center">
            <p className="font-mono text-sm font-semibold">{stat.value}</p>
            <p className="text-[10px] text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TopCard;
