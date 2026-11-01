"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import MemberForm from "@/components/admin/MemberForm";
import PageHeader from "@/components/layout/PageHeader";
import RoleGuard from "@/components/layout/RoleGuard";
import PersonCard, { type Pill } from "@/components/people/PersonCard";
import Button from "@/components/ui/Button";
import Sheet from "@/components/ui/Sheet";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectDepartmentNames, selectStandings, selectUsers } from "@/store/selectors";
import { addMember, updateMember } from "@/store/thunks";
import type { MemberForm as MemberValues } from "@/utils/schemas";
import type { Role, User } from "@/utils/types";

const rolePills: Record<Role, Pill> = {
  admin: { label: "Admin", dot: "bg-zinc-900" },
  lead: { label: "Team lead", dot: "bg-amber-500" },
  member: { label: "Member" },
};

const MembersPage = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const standings = useAppSelector(selectStandings);
  const departmentNames = useAppSelector(selectDepartmentNames);
  const pointsOf = (userId: string) =>
    standings.find((standing) => standing.user.id === userId)?.points ?? 0;
  const [editing, setEditing] = useState<User | "new" | null>(null);

  const handleSave = async (values: MemberValues) => {
    if (editing === "new") await dispatch(addMember(values));
    else if (editing) await dispatch(updateMember({ ...editing, ...values }));
    setEditing(null);
  };

  return (
    <RoleGuard roles={["admin"]}>
      <div className="mx-auto max-w-5xl">
        <PageHeader
          title="Members"
          subtitle={`${users.length} people across the media department`}
          action={
            <Button onClick={() => setEditing("new")}>
              <Plus className="size-4" /> Add member
            </Button>
          }
        />
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {users.map((user) => (
            <PersonCard
              key={user.id}
              name={user.name}
              photo={user.photo}
              subtitle={`${departmentNames(user.departments)} · ${user.hasPasskey ? "Passkey" : "No passkey"}`}
              pill={rolePills[user.role]}
              tag={`${pointsOf(user.id)} pts`}
              onClick={() => setEditing(user)}
            />
          ))}
        </div>
        <Sheet
          open={editing !== null}
          title={editing === "new" ? "Add member" : "Edit member"}
          onClose={() => setEditing(null)}
        >
          {editing !== null && (
            <MemberForm
              key={editing === "new" ? "new" : editing.id}
              initial={editing === "new" ? undefined : editing}
              onSave={handleSave}
            />
          )}
        </Sheet>
      </div>
    </RoleGuard>
  );
};

export default MembersPage;
