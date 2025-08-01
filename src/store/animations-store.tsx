import { create } from "zustand";

interface State {
  isPreloading: boolean;
  isTransitioning: boolean;
  canAnimate: boolean;
  canScroll: boolean;
  cursorSize: number;
  cursorColor: string;
  cursorText: string;
  setCursorText: (text: string) => void;
  isTouchDevice: boolean;
  currentTheme: "dark" | "light";
  overHero: boolean;

  setIsPreloading: (value: boolean) => void;
  setOverHero: (value: boolean) => void;
  setIsTransitioning: (value: boolean) => void;
  setCanAnimate: (value: boolean) => void;
  setCanScroll: (value: boolean) => void;
  setCursorSize: (size: number) => void;
  setCursorColor: (color: string) => void;
  setCurrentTheme: (theme: "dark" | "light") => void;
  setIsTouchDevice: (value: boolean) => void;
}

export const useAnimationsStore = create<State>()((set) => ({
  isPreloading: true,
  isTransitioning: false,
  canAnimate: false,
  canScroll: false,
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
  setCanAnimate: (value) => set({ canAnimate: value }),
  setCanScroll: (value) => set({ canScroll: value }),
}));
