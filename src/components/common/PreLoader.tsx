/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useAnimationsStore } from "@/store";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { LenisContext } from "../providers/LenisProvider";
import { useContext, useEffect, useRef, useState } from "react";

export const PreLoader = () => {
  const preLoaderRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const [canPreload, setCanPreload] = useState(true);
  const { setIsPreloading, setCanAnimate, isPreloading,setCanScroll } = useAnimationsStore();

  const { lenisRef } = useContext(LenisContext);
  useGSAP(
    () => {
      if (!preLoaderRef.current || !canPreload) return;

      tlRef.current = gsap
        .timeline({
          defaults: {
            ease: "linear",
          },
          onStart: () => {
            setIsPreloading(true);
            setCanAnimate(false);
          },
          onComplete: () => {
            setIsPreloading(false);
            setCanAnimate(true);
          },
        })
        .to(preLoaderRef.current, {
          opacity: 1,
          duration: 0.5,
        })
        .to(".loader-bar", {
          scaleY: 1,
          ease: "power1.inOut",
          duration: 2,
          transformOrigin: "bottom",
        })
        .to(".hider", {
          delay: 0.2,
          translateY: "-50%",
          duration: 1,
          ease: "power4.out",
        })
        .set(preLoaderRef.current, {
          display: "none",
        });
    },
    {
      scope: preLoaderRef,
      dependencies: [canPreload],
      revertOnUpdate: true,
    }
  );

  useEffect(() => {
    if (isPreloading) {
      lenisRef.current?.lenis?.stop();
      setCanScroll(false);
    } else {
      lenisRef.current?.lenis?.start();
      setCanScroll(true);
    }
  }, [isPreloading, lenisRef, lenisRef.current]);

  useEffect(() => {
    if (!lenisRef.current || !tlRef.current) return;

    if (lenisRef.current.lenis && lenisRef.current.lenis.scroll > 50) {
      setCanPreload(false);
      setIsPreloading(false);
      setCanAnimate(true);
      lenisRef.current.lenis.start();
      preLoaderRef.current!.style.display = "none";
      return;
    }
  }, [lenisRef, lenisRef.current]);

  return (
    <div
      ref={preLoaderRef}
      className="     opacity-0  flex items-center justify-center  w-screen h-[100dvh] md:h-screen rounded-lg fixed top-0 left-0 z-200 bg-background "
    >
      <div className="loader-logo size-15 md:size-20 z-200 " />
      <div className="loader-bg absolute top-1/2 left-1/2 -translate-x-1/2 bg-orange/50 -translate-y-1/2 loader-bg size-14 md:size-19 z-40" />
      <div className="loader-bar absolute top-1/2 left-1/2 -translate-x-1/2 bg-orange scale-y-0 -translate-y-1/2 loader-bar size-14 md:size-19 z-35" />
      <div className=" hider absolute top-1/2 left-1/2 -translate-x-1/2 bg-background translate-y-10  loader-bar size-20 md:size-25 z-200" />
    </div>
  );
};
