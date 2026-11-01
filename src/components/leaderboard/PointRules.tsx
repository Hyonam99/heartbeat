import Card from "@/components/ui/Card";
import { levels, pointRules } from "@/utils/points";

const rules = [
  { label: `Early bird (${pointRules.earlyMin}+ min before service)`, points: pointRules.early },
  { label: "On time", points: pointRules.onTime },
  { label: "Manual check-in", points: pointRules.override },
  { label: "Late", points: pointRules.late },
  { label: "Streak bonus per week in a row", points: pointRules.streakStep },
];

const PointRules = () => (
  <Card>
    <h2 className="mb-3 text-sm font-semibold">How points work</h2>
    <ul className="flex flex-col gap-2 text-sm">
      {rules.map((rule) => (
        <li key={rule.label} className="flex justify-between gap-3">
          <span className="text-muted">{rule.label}</span>
          <span className="font-mono">+{rule.points}</span>
        </li>
      ))}
    </ul>
    <p className="mt-3 text-xs text-muted">
      Streak bonus caps at +{pointRules.streakCap}. Levels:{" "}
      {levels.map((level) => `${level.name} ${level.min}`).join(" · ")}
    </p>
  </Card>
);

export default PointRules;
