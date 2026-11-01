"use client";

import IconButton from "@mui/material/IconButton";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import routePath from "@/constants/route.json";
import { useAppDispatch } from "@/store";
import { signOut } from "@/store/thunks";

const SignOutButton = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSignOut = async () => {
    await dispatch(signOut());
    router.replace(routePath.Auth.Login);
  };

  return (
    <IconButton size="small" aria-label="Sign out" onClick={handleSignOut}>
      <LogOut className="size-4" />
    </IconButton>
  );
};

export default SignOutButton;
