import type { ReactNode } from "react";
import MemberShell from "@/components/layout/MemberShell";
import RoleGuard from "@/components/layout/RoleGuard";

const MemberLayout = ({ children }: { children: ReactNode }) => (
  <RoleGuard roles={["member", "lead", "admin"]}>
    <MemberShell>{children}</MemberShell>
  </RoleGuard>
);

export default MemberLayout;
