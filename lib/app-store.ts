import { create } from "zustand";

interface AppStore {
  //triggerAnimation: boolean;
  isPreloading: boolean;
  isTransitioning: boolean;
  isLenisStopped: boolean;

  cursorSize: number;
  cursorColor: string;
  cursorText: string;
  isTouchDevice: boolean;
  currentTheme: "dark" | "light";
  overHero: boolean;

  // setTriggerAnimation: (value: boolean) => void;
  setCursorText: (text: string) => void;
  setIsPreloading: (value: boolean) => void;
  setOverHero: (value: boolean) => void;
  setIsTransitioning: (value: boolean) => void;
  setIsLenisStopped: (value: boolean) => void;

  setCursorSize: (size: number) => void;
  setCursorColor: (color: string) => void;
  setCurrentTheme: (theme: "dark" | "light") => void;
  setIsTouchDevice: (value: boolean) => void;
}

export const useAppStore = create<AppStore>()((set) => ({
  isPreloading: true,
  isTransitioning: false,
  isLenisStopped: false,

  cursorSize: 0,
  currentTheme: "dark",
  cursorColor: "var(--color-orange)",
  cursorText: "",
  isTouchDevice: false,
  overHero: false,

  setCursorSize: (size) => set({ cursorSize: size }),
  setCursorColor: (color) => set({ cursorColor: color }),
  setOverHero: (value) => set({ overHero: value }),
  setCursorText: (text) => set({ cursorText: text }),
  setIsTouchDevice: (value) => set({ isTouchDevice: value }),
  setCurrentTheme: (theme) => set({ currentTheme: theme }),
  setIsPreloading: (value) => set({ isPreloading: value }),
  setIsTransitioning: (value) => set({ isTransitioning: value }),
  setIsLenisStopped: (value) => set({ isLenisStopped: value }),
}));
