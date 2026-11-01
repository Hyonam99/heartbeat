"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectCurrentUser, selectSettings, selectTodayService } from "@/store/selectors";
import { checkIn } from "@/store/thunks";
import { getPosition, haversineM } from "@/utils/geo";
import type { CheckInMethod } from "@/utils/types";

export type Step = "idle" | "locating" | "outside" | "scanning" | "saving" | "error";

const locationError = (error: unknown) => {
  if (error instanceof GeolocationPositionError && error.code === error.PERMISSION_DENIED) {
    return "Location permission was denied. Allow location access and try again.";
  }
  return error instanceof Error ? error.message : "Could not read your location";
};

const useCheckIn = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const service = useAppSelector(selectTodayService);
  const settings = useAppSelector(selectSettings);
  const [step, setStep] = useState<Step>("idle");
  const [distM, setDistM] = useState<number | null>(null);
  const [method, setMethod] = useState<Exclude<CheckInMethod, "override">>("gps");
  const [error, setError] = useState("");

  const fail = (message: string) => {
    setError(message);
    setStep("error");
  };

  const start = async () => {
    setStep("locating");
    try {
      const { coords } = await getPosition();
      const dist = haversineM(coords.latitude, coords.longitude, settings.lat, settings.lng);
      setDistM(dist);
      setMethod("gps");
      setStep(dist <= settings.radiusM ? "scanning" : "outside");
    } catch (caught) {
      fail(locationError(caught));
    }
  };

  const chooseWifi = () => {
    setMethod("wifi");
    setStep("scanning");
  };

  const confirm = async () => {
    if (!user || !service) return;
    setStep("saving");
    const result = await dispatch(
      checkIn({ userId: user.id, serviceId: service.id, method, distM: distM ?? undefined }),
    );
    if (checkIn.rejected.match(result)) fail(result.error.message ?? "Check-in failed");
    else setStep("idle");
  };

  const reset = () => setStep("idle");

  return { step, distM, error, settings, start, chooseWifi, confirm, reset };
};

export default useCheckIn;
