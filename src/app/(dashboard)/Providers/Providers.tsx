"use client";

import { Toaster } from "@/components/ui/toaster";
import { NextUIProvider } from "@nextui-org/react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <NextUIProvider>{children}</NextUIProvider>
        <Toaster />
      </ThemeProvider>
    </>
  );
}
