"use client";

import type { ReactNode } from "react";
import { CalendarDays, Fingerprint, History, LayoutDashboard, Trophy } from "lucide-react";
import Logo from "@/components/layout/Logo";
import NavLink, { type NavItem } from "@/components/layout/NavLink";
import SignOutButton from "@/components/layout/SignOutButton";
import ThemeToggle from "@/components/layout/ThemeToggle";
import routePath from "@/constants/route.json";
import { useAppSelector } from "@/store";
import { selectCurrentUser } from "@/store/selectors";

const memberItems: NavItem[] = [
  { href: routePath.Member.CheckIn, label: "Check in", icon: Fingerprint },
  { href: routePath.Member.Duties, label: "Duties", icon: CalendarDays },
  { href: routePath.Member.History, label: "History", icon: History },
  { href: routePath.Member.Leaderboard, label: "Ranks", icon: Trophy },
];

const adminItem: NavItem = {
  href: routePath.Admin.Dashboard,
  label: "Admin",
  icon: LayoutDashboard,
};

const MemberShell = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  const items = user?.role === "member" ? memberItems : [...memberItems, adminItem];

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col">
      <header className="flex items-center justify-between px-4 py-3">
        <Logo />
        <div className="flex items-center">
          <ThemeToggle />
          <SignOutButton />
        </div>
      </header>
      <main className="flex-1 px-4 pb-24">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 border-t border-line bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-lg pb-[env(safe-area-inset-bottom)]">
          {items.map((item) => (
            <NavLink key={item.href} item={item} layout="tab" />
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MemberShell;
