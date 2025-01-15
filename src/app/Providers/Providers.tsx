"use client";

import { Toaster } from "@/components/ui/toaster";
import { NextUIProvider } from "@nextui-org/react";
import { GoogleAnalytics } from "@next/third-parties/google";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextUIProvider>{children}</NextUIProvider>
      <Toaster />
      <GoogleAnalytics gaId="G-PZ93FY9JWT" />
    </>
  );
}
