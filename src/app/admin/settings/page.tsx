"use client";

import { RotateCcw } from "lucide-react";
import { resetDemoData } from "@/api/settings";
import DepartmentSettings from "@/components/admin/DepartmentSettings";
import SettingsForm from "@/components/admin/SettingsForm";
import PageHeader from "@/components/layout/PageHeader";
import RoleGuard from "@/components/layout/RoleGuard";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const SettingsPage = () => {
  const handleReset = async () => {
    if (!globalThis.confirm("Reset all demo data back to the original seed?")) return;
    await resetDemoData();
    globalThis.location.reload();
  };

  return (
    <RoleGuard roles={["admin"]}>
      <div className="mx-auto max-w-2xl">
        <PageHeader title="Settings" subtitle="Geofence, check-in rules and departments." />
        <Card>
          <SettingsForm />
        </Card>
        <Card className="mt-6">
          <DepartmentSettings />
        </Card>
        <Card className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm">
            <p className="font-medium">Demo data</p>
            <p className="text-muted">Mock data lives in this browser until phase 2.</p>
          </div>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="size-4" /> Reset demo data
          </Button>
        </Card>
      </div>
    </RoleGuard>
  );
};

export default SettingsPage;
