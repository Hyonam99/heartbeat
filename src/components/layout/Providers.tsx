"use client";

import { useEffect, type ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { makeStore } from "@/store";
import { loadAll } from "@/store/thunks";
import theme from "@/utils/theme";

const store = makeStore();

const Providers = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    store.dispatch(loadAll());
  }, []);

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme} defaultMode="system" disableTransitionOnChange>
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default Providers;
