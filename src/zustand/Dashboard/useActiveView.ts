import { create } from "zustand";

interface ActiveViewStore {
  activeView: "overview" | "tickets" | "analytics";
  setActiveView: (view: "overview" | "tickets" | "analytics") => void;
}

export const useActiveView = create<ActiveViewStore>((set) => ({
  activeView: "overview",
  setActiveView: (view) => set({ activeView: view }),
}));
