"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LocateFixed } from "lucide-react";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Spinner from "@/components/ui/Spinner";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectSettings } from "@/store/selectors";
import { saveSettings } from "@/store/thunks";
import { getPosition } from "@/utils/geo";
import {
  settingsSchema,
  type SettingsForm as SettingsValues,
  type SettingsInput,
} from "@/utils/schemas";

const SettingsForm = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);
  const [isLocating, setIsLocating] = useState(false);
  const [notice, setNotice] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SettingsInput, unknown, SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings,
  });

  const fillMyLocation = async () => {
    setIsLocating(true);
    try {
      const { coords } = await getPosition();
      setValue("lat", Number(coords.latitude.toFixed(6)), { shouldDirty: true });
      setValue("lng", Number(coords.longitude.toFixed(6)), { shouldDirty: true });
      setNotice("Location filled in. Save to apply.");
    } catch {
      setNotice("Could not read your location.");
    } finally {
      setIsLocating(false);
    }
  };

  const onSubmit = async (values: SettingsValues) => {
    await dispatch(saveSettings(values));
    setNotice("Settings saved.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Field label="Church name" error={errors.churchName?.message}>
        <Input {...register("churchName")} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Latitude" error={errors.lat?.message}>
          <Input {...register("lat")} inputMode="decimal" />
        </Field>
        <Field label="Longitude" error={errors.lng?.message}>
          <Input {...register("lng")} inputMode="decimal" />
        </Field>
      </div>
      <Button type="button" variant="outline" onClick={fillMyLocation} disabled={isLocating}>
        {isLocating ? <Spinner /> : <LocateFixed className="size-4" />}
        Use my current location
      </Button>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Radius (m)" error={errors.radiusM?.message}>
          <Input {...register("radiusM")} inputMode="numeric" />
        </Field>
        <Field label="Late after (min)" error={errors.lateAfterMin?.message}>
          <Input {...register("lateAfterMin")} inputMode="numeric" />
        </Field>
        <Field label="Church Wi-Fi" error={errors.wifiName?.message}>
          <Input {...register("wifiName")} />
        </Field>
      </div>
      {notice && <p className="rounded-lg bg-brand-soft px-3 py-2 text-sm text-brand">{notice}</p>}
      <Button type="submit" disabled={isSubmitting}>
        Save settings
      </Button>
    </form>
  );
};

export default SettingsForm;
