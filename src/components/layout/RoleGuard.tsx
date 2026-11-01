"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";
import routePath from "@/constants/route.json";
import { useAppSelector } from "@/store";
import { selectCurrentUser } from "@/store/selectors";
import type { Role } from "@/utils/types";

type RoleGuardProps = { roles: Role[]; children: ReactNode };

const RoleGuard = ({ roles, children }: RoleGuardProps) => {
  const router = useRouter();
  const isReady = useAppSelector((state) => state.auth.isReady);
  const user = useAppSelector(selectCurrentUser);
  const isAllowed = !!user && roles.includes(user.role);

  useEffect(() => {
    if (!isReady) return;
    if (!user) router.replace(routePath.Auth.Login);
    else if (!isAllowed) router.replace(routePath.Member.CheckIn);
  }, [isReady, user, isAllowed, router]);

  if (!isReady || !isAllowed) return <Spinner full />;
  return children;
};

export default RoleGuard;
