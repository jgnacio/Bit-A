"use client";
import type { ReactNode } from "react";
import { create } from "zustand";

export type CursorType = "default" | "pointer" | "hover" | "diamond";

type CursorStore = {
  type: CursorType;
  label: ReactNode;
  setCursorType: ({
    type,
    label,
  }: {
    type: CursorType;
    label?: ReactNode;
  }) => void;
};

const useCursorStore = create<CursorStore>((set) => ({
  type: "default",
  label: null,
  setCursorType: ({ type, label }) => {
    if (type === "default") {
      set({
        type: "default",
      });
      setTimeout(() => {
        set({
          label: null,
        });
      }, 300);
    } else {
      set({ type, label });
    }
  },
}));

export default useCursorStore;
