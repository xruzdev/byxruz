"use client";

import { ReactNode, useEffect } from "react";
import { LenisProvider } from "./LenisProvider";
import { ParallaxProvider } from "./ParallaxProvider";
import { PageTransition } from "../common/PageTransition";
import { PreLoader } from "../common/PreLoader";
import { VirtualScrollBar } from "../common/VirtualScrollBar";
import { Nav } from "../common/nav/Nav";
import { GrainyBackground } from "../common/grainyBg/GrainyBackground";
import Cursor from "../common/AnimatedCursor";
import { Footer } from "../common/Footer";
import { useAnimationsStore } from "@/store";
/* import { ContactLinkBtn } from "../common/ContactLinkBtn"; */

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const { setCurrentTheme } = useAnimationsStore();

  useEffect(() => {
    const mediaTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = () => {
      setCurrentTheme(mediaTheme.matches ? "dark" : "light");
    };
    mediaTheme.addEventListener("change", updateTheme);
    updateTheme();
    return () => {
      mediaTheme.removeEventListener("change", updateTheme);
    };
  }, [setCurrentTheme]);

  return (
    <LenisProvider>
      <ParallaxProvider>
        <Nav />
        <VirtualScrollBar />
        <GrainyBackground />
      <PreLoader />  
        <PageTransition />
        <Cursor />
        <main className="h-auto w-screen">
          {/*  <ContactLinkBtn /> */}
          {children}
          <Footer />
        </main>
      </ParallaxProvider>
    </LenisProvider>
  );
}
