"use client";
import { useAnimationsStore } from "@/store";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";
import { useRef } from "react";

const pageNames: {
  [key: string]: string;
} = {
  "/": "Home",
  "/about": "Sobre Mi",
  "/work": "Mi Trabajo",
  "/contact": "Contacto",
};

export const PageTransition = () => {
  const pathname = usePathname();

  const preLoaderRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const store = useAnimationsStore.getState();

 

  useGSAP(
    () => {
       store.setCanScroll(false);
      if (!preLoaderRef.current || store.isPreloading) return;

      tlRef.current = gsap
        .timeline({
          defaults: {
            ease: "power2.inOut",
          },
          onStart: () => {
            store.setIsTransitioning(true);

           
          },
          onComplete: () => {
            store.setIsTransitioning(false);
            store.setCanAnimate(true);
           store.setCanScroll(true);
            gsap.to(document.body.querySelector("main"), {
              opacity: 1,
              duration: 0.5,
            });
          },
        })
        .set(preLoaderRef.current, {
          display: "block",
        })
        .to(preLoaderRef.current, {
          opacity: 1,
          duration: 0.5,
        })
        .to("h1", {
          opacity: 1,

          yoyo: true,
          ease: "power2.out",
          duration: 0.5,
        })

        .to(preLoaderRef.current, {
          opacity: 0,

          duration: 0.5,
        })
        .set(preLoaderRef.current, {
          display: "none",
        });
    },
    {
      scope: preLoaderRef,
      dependencies: [pathname],
      revertOnUpdate: true,
    }
  );

  return (
    <div
      ref={preLoaderRef}
      className="fixed top-0 left-0   opacity-0     w-screen h-[100dvh] lg:h-screen z-1000 pointer-events-none bg-background"
    >
      <h1 className="text-6xl  xl:text-9xl font-display   uppercase font-bold absolute bottom-10 right-10">
        {pageNames[pathname] || "Page Not Found"}
      </h1>
    </div>
  );
};
