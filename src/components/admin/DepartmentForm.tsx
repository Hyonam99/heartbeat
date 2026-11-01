"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { splitRoles } from "@/utils/departments";
import { departmentSchema, type DepartmentForm as DepartmentValues } from "@/utils/schemas";
import type { Department } from "@/utils/types";

type DepartmentFormProps = {
  initial?: Department;
  takenNames: string[];
  onSave: (input: Omit<Department, "id">) => Promise<void>;
};

const DepartmentForm = ({ initial, takenNames, onSave }: DepartmentFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<DepartmentValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: { name: initial?.name ?? "", roles: initial?.roles.join("\n") ?? "" },
  });

  const onSubmit = async ({ name, roles }: DepartmentValues) => {
    if (takenNames.includes(name.toLowerCase())) {
      setError("name", { message: "A department with this name already exists" });
      return;
    }
    await onSave({ name, roles: [...new Set(splitRoles(roles))] });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Field label="Department name" error={errors.name?.message}>
        <Input {...register("name")} placeholder="e.g. Lighting" />
      </Field>
      <Field label="Roles" error={errors.roles?.message}>
        <Textarea {...register("roles")} minRows={4} placeholder={"Lighting Desk\nSpotlight"} />
      </Field>
      <p className="-mt-2 text-xs text-muted">
        One role per line. Each role becomes a slot on the duty roster. Removing a role clears
        anyone rostered in it.
      </p>
      <Button type="submit" disabled={isSubmitting}>
        Save department
      </Button>
    </form>
  );
};

export default DepartmentForm;
