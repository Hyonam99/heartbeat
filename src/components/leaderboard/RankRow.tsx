import StatTrio from "@/components/leaderboard/StatTrio";
import Avatar from "@/components/ui/Avatar";
import { useAppSelector } from "@/store";
import { selectDepartmentNames } from "@/store/selectors";
import { cn } from "@/utils/cn";
import { levelOf, type Standing } from "@/utils/points";
import { ordinal } from "@/utils/stats";

type RankRowProps = { standing: Standing; isMe: boolean };

const RankRow = ({ standing, isMe }: RankRowProps) => {
  const { user, rank, points } = standing;
  const departmentNames = useAppSelector(selectDepartmentNames);
  return (
    <li
      className={cn(
        "flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-2.5 ring-1 ring-white/5 sm:gap-4 sm:px-4",
        isMe && "bg-amber-400/10 ring-amber-300/50",
      )}
    >
      <div className="flex shrink-0 items-center">
        <span className="z-10 flex size-10 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#fafafa,#a1a1aa_60%,#52525b)] font-display text-sm text-zinc-900 shadow-md ring-2 ring-zinc-900">
          {ordinal(rank)}
        </span>
        <Avatar name={user.name} src={user.photo} className="-ml-3 size-11" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-white">
          {user.name}
          {isMe && <span className="ml-1 text-xs font-normal text-amber-300">(you)</span>}
        </p>
        <p className="truncate text-xs text-white/55">
          Lv {levelOf(points).number} · {departmentNames(user.departments)}
        </p>
        <StatTrio standing={standing} className="mt-1 gap-3 md:hidden" />
      </div>
      <StatTrio standing={standing} className="hidden gap-8 md:flex" />
      <div className="w-14 shrink-0 text-right">
        <p className="font-display text-3xl leading-none text-white tabular-nums">{points}</p>
        <p className="text-[9px] font-semibold tracking-[0.25em] text-white/50">SCORE</p>
      </div>
    </li>
  );
};

export default RankRow;
