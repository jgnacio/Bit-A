"use client";

import { Toaster } from "@/components/ui/toaster";
import { NextUIProvider } from "@nextui-org/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import useCursorStore from "@/hooks/useCursorStore";
import CustomCursor from "@/components/Cursor/Cursor";

export function Providers({ children }: { children: React.ReactNode }) {
  const cursorStore = useCursorStore();

  return (
    <div
      onMouseEnter={() => {
        cursorStore.setCursorType({ type: "default" });
      }}
      onMouseLeave={() => {
        cursorStore.setCursorType({ type: "none" });
      }}
    >
      <NextUIProvider>
        {children}

        <CustomCursor />
      </NextUIProvider>
      <Toaster />
      <GoogleAnalytics gaId="G-PZ93FY9JWT" />
    </div>
  );
}
