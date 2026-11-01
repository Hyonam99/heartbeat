"use client";

import { useState, type ReactNode } from "react";
import {
  CalendarRange,
  ClipboardList,
  Fingerprint,
  LayoutDashboard,
  Menu,
  Settings,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";
import Logo from "@/components/layout/Logo";
import NavLink, { type NavItem } from "@/components/layout/NavLink";
import SignOutButton from "@/components/layout/SignOutButton";
import ThemeToggle from "@/components/layout/ThemeToggle";
import IconButton from "@mui/material/IconButton";
import Avatar from "@/components/ui/Avatar";
import routePath from "@/constants/route.json";
import { useAppSelector } from "@/store";
import { selectCurrentUser } from "@/store/selectors";
import { cn } from "@/utils/cn";

const leadItems: NavItem[] = [
  { href: routePath.Admin.Dashboard, label: "Dashboard", icon: LayoutDashboard },
  { href: routePath.Admin.Attendance, label: "Attendance", icon: ClipboardList },
  { href: routePath.Admin.Override, label: "Manual check-in", icon: ShieldCheck },
  { href: routePath.Admin.Roster, label: "Roster", icon: CalendarRange },
  { href: routePath.Admin.Leaderboard, label: "Leaderboard", icon: Trophy },
];

const adminItems: NavItem[] = [
  { href: routePath.Admin.Members, label: "Members", icon: Users },
  { href: routePath.Admin.Settings, label: "Settings", icon: Settings },
];

const checkInItem: NavItem = {
  href: routePath.Member.CheckIn,
  label: "My check-in",
  icon: Fingerprint,
};

const AdminShell = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  const [isOpen, setIsOpen] = useState(false);
  const items = user?.role === "admin" ? [...leadItems, ...adminItems] : leadItems;

  return (
    <div className="min-h-dvh lg:flex">
      <header className="flex items-center justify-between border-b border-line bg-card px-4 py-3 lg:hidden">
        <Logo />
        <IconButton size="small" aria-label="Open menu" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="size-5" />
        </IconButton>
      </header>
      <aside
        className={cn(
          "flex-col border-r border-line bg-card p-4 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-64",
          isOpen ? "flex" : "hidden",
        )}
      >
        <div className="mb-6 hidden lg:block">
          <Logo />
        </div>
        <nav className="flex flex-1 flex-col gap-1" onClick={() => setIsOpen(false)}>
          {items.map((item) => (
            <NavLink key={item.href} item={item} layout="side" />
          ))}
          <div className="my-2 border-t border-line" />
          <NavLink item={checkInItem} layout="side" />
        </nav>
        {user && (
          <div className="mt-4 flex items-center gap-2 border-t border-line pt-4">
            <Avatar name={user.name} src={user.photo} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted capitalize">{user.role}</p>
            </div>
            <ThemeToggle />
            <SignOutButton />
          </div>
        )}
      </aside>
      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
};

export default AdminShell;
