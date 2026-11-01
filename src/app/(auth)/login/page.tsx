"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ButtonBase from "@mui/material/ButtonBase";
import { ChevronRight } from "lucide-react";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/layout/ThemeToggle";
import Avatar from "@/components/ui/Avatar";
import Card from "@/components/ui/Card";
import Spinner from "@/components/ui/Spinner";
import routePath from "@/constants/route.json";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectCurrentUser, selectUsers } from "@/store/selectors";
import { signIn } from "@/store/thunks";
import type { Role, User } from "@/utils/types";

const groups: { role: Role; title: string }[] = [
  { role: "admin", title: "Admin" },
  { role: "lead", title: "Team leads" },
  { role: "member", title: "Members" },
];

const homeFor = (user: User) =>
  user.role === "member" ? routePath.Member.CheckIn : routePath.Admin.Dashboard;

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isReady = useAppSelector((state) => state.auth.isReady);
  const users = useAppSelector(selectUsers);
  const currentUser = useAppSelector(selectCurrentUser);
  const [pendingId, setPendingId] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) router.replace(homeFor(currentUser));
  }, [currentUser, router]);

  const handlePick = async (user: User) => {
    setPendingId(user.id);
    await dispatch(signIn(user.id));
    setPendingId(null);
  };

  if (!isReady) return <Spinner full />;

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <Logo />
        <ThemeToggle />
      </div>
      <h1 className="font-serif text-4xl tracking-tight">Sign in</h1>
      <p className="mt-1 mb-6 text-sm text-muted">
        Demo mode: pick a team member to continue. Passkey sign-in arrives in phase 2.
      </p>
      {groups.map((group) => (
        <section key={group.role} className="mb-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
            {group.title}
          </h2>
          <Card className="divide-y divide-line p-0">
            {users
              .filter((user) => user.role === group.role)
              .map((user) => (
                <ButtonBase
                  key={user.id}
                  onClick={() => handlePick(user)}
                  disabled={!!pendingId}
                  className="flex w-full justify-start gap-3 px-4 py-3 text-left hover:bg-subtle disabled:opacity-60"
                >
                  <Avatar name={user.name} src={user.photo} />
                  <span className="flex-1 text-sm font-medium">{user.name}</span>
                  {pendingId === user.id ? (
                    <Spinner />
                  ) : (
                    <ChevronRight className="size-4 text-muted" />
                  )}
                </ButtonBase>
              ))}
          </Card>
        </section>
      ))}
    </div>
  );
};

export default LoginPage;
