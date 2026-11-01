"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useAppSelector } from "@/store";
import { selectDepartments } from "@/store/selectors";
import { memberSchema, type MemberForm as MemberValues } from "@/utils/schemas";

type MemberFormProps = { initial?: MemberValues; onSave: (values: MemberValues) => Promise<void> };

const blank: MemberValues = { name: "", phone: "", role: "member", departments: [] };

const MemberForm = ({ initial = blank, onSave }: MemberFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MemberValues>({ resolver: zodResolver(memberSchema), defaultValues: initial });
  const departments = useAppSelector(selectDepartments);
  const departmentsField = register("departments");

  return (
    <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-4">
      <Field label="Full name" error={errors.name?.message}>
        <Input {...register("name")} />
      </Field>
      <Field label="Phone" error={errors.phone?.message}>
        <Input {...register("phone")} placeholder="+2348030000000" inputMode="tel" />
      </Field>
      <Field label="Role" error={errors.role?.message}>
        <Select {...register("role")}>
          <option value="member">Member</option>
          <option value="lead">Team lead</option>
          <option value="admin">Admin</option>
        </Select>
      </Field>
      <fieldset className="flex flex-col gap-1.5 text-sm">
        <legend className="mb-1.5 font-medium">Departments</legend>
        <div className="grid grid-cols-2 gap-2">
          {departments.map(({ id, name }) => (
            <FormControlLabel
              key={id}
              label={name}
              className="m-0 rounded-lg border border-line pr-3"
              control={
                <Checkbox
                  size="small"
                  value={id}
                  defaultChecked={initial.departments.includes(id)}
                  slotProps={{ input: departmentsField }}
                />
              }
            />
          ))}
        </div>
        {errors.departments && (
          <span className="text-xs text-bad">{errors.departments.message}</span>
        )}
      </fieldset>
      <Button type="submit" disabled={isSubmitting}>
        Save member
      </Button>
    </form>
  );
};

export default MemberForm;
