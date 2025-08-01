/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useAnimationsStore } from "@/store";
import { gsap } from "gsap";
import { LenisRef, ReactLenis, useLenis } from "lenis/react";
import {
  ReactNode,
  RefObject,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface LenisProviderProps {
  children: ReactNode;
}

export const LenisContext = createContext({
  velocity: 0,
  scrollPercentage: 0,
  lenisRef: { current: null } as RefObject<LenisRef | null>,
  direction: 0,
});

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef: RefObject<LenisRef | null> = useRef(null);
  const startLenis = useAnimationsStore((state) => state.canScroll);
  const [direction, setDirection] = useState<number>(0);
  const [velocity, setVelocity] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const { isTouchDevice, setIsTouchDevice } = useAnimationsStore();

  useEffect(() => {
    setIsTouchDevice(typeof window !== "undefined" && "ontouchstart" in window);
  }, []);

  useEffect(() => {
    if (isTouchDevice) {
      document.body.style.overflowY = "auto";
    }
  }, [isTouchDevice]);

  useEffect(() => {

    if (!lenisRef.current || !lenisRef.current.lenis) return;

    console.log(startLenis);

    if (startLenis) {
      lenisRef.current.lenis.start();
    } else {
      lenisRef.current.lenis.stop();
    }
  }, [startLenis]);

  useLenis((lenis) => {
    setVelocity(lenis.velocity);
    setScrollPercentage(lenis.scroll / lenis.limit);
    setDirection(lenis.direction);
  }, []);

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <LenisContext.Provider value={{ velocity, scrollPercentage, lenisRef, direction }}>
      <ReactLenis
        ref={lenisRef}
        
        options={{
          syncTouch: false,
          lerp: 0.05,
          autoRaf: false,
          
        }}
        root
      >
        {children}
      </ReactLenis>
    </LenisContext.Provider>
  );
}
