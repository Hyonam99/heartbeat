"use client";

import IconButton from "@mui/material/IconButton";
import { useColorScheme } from "@mui/material/styles";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { mode, systemMode, setMode } = useColorScheme();
  const isDark = (mode === "system" ? systemMode : mode) === "dark";

  return (
    <IconButton
      size="small"
      aria-label="Toggle theme"
      onClick={() => setMode(isDark ? "light" : "dark")}
    >
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </IconButton>
  );
};

export default ThemeToggle;
