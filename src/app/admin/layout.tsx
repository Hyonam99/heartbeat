import type { ReactNode } from "react";
import AdminShell from "@/components/layout/AdminShell";
import RoleGuard from "@/components/layout/RoleGuard";

const AdminLayout = ({ children }: { children: ReactNode }) => (
  <RoleGuard roles={["lead", "admin"]}>
    <AdminShell>{children}</AdminShell>
  </RoleGuard>
);

export default AdminLayout;
