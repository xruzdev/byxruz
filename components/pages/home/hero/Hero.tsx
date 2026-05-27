"use client";

import InteractiveGradient from "@/components/common/InteractiveGradient/InteractiveGradient";
import { gsap, useGSAP } from "@/lib/gsap";
import Link from "next/link";
import { useRef } from "react";

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const wordIndexRef = useRef(0);

  const words = [
    "Developed",
    "Created",
    "Designed",
    "Automatized",
    "Engineered",
  ];

  useGSAP(
    () => {
      const wordEl = wordRef.current;
      if (!wordEl) return;

      gsap.set(wordEl, {
        transformPerspective: 900,
        transformOrigin: "50% 50%",
        willChange: "transform, opacity, filter",
      });

      tl.current = gsap
        .timeline({
          repeat: -1,
          repeatDelay: 0.8,
          defaults: {
            ease: "none",
          },
        })
        .to(wordEl, {
          duration: 0.35,
          rotationX: 35,
          y: -8,
          opacity: 0.75,
          filter: "blur(1px)",
        })
        .to(wordEl, {
          duration: 0.3,
          rotationX: 88,
          y: -24,
          opacity: 0,
          filter: "blur(8px)",
        })
        .call(() => {
          wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
          wordEl.textContent = words[wordIndexRef.current];
          gsap.set(wordEl, {
            rotationX: -88,
            y: 24,
            opacity: 0,
            filter: "blur(8px)",
          });
        })
        .to(wordEl, {
          duration: 0.65,
          rotationX: 0,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          ease: "power3.out",
        });

      return () => {
        tl.current?.kill();
        gsap.set(wordEl, { clearProps: "willChange,filter" });
        tl.current = null;
      };
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex flex-col items-ewnd justify-end w-full h-screen p-4 pb-20 lg:p-10 overflow-hidden"
    >
      <InteractiveGradient />

       

      <h1 className="text-6xl md:text-8xl 2xl:text-9xl font-bold uppercase  z-10">
        <span
          className="inline-block min-w-[8ch]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span ref={wordRef} className="inline-block ">
            {words[0]}
          </span>
        </span>{" "}
        <div>
          by <span className="text-main ">Xruz</span>
        </div>
      </h1>

        <div className="flex z-500 justify-between gap-4 items-center  w-full h-15 lg:hidden overflow-hidden">
        <Link
          href="/contact"
          className="  bg-transparent text-light border border-main uppercase justify-center font-bold  flex items-center rounded-lg h-3/4  flex-1"
        >
          contacto
        </Link>
        <Link
          href="/work"
          className="  bg-transparent text-light border border-main uppercase justify-center font-bold  flex items-center rounded-lg h-3/4 flex-1  "
        >
          Mi Trabajo
        </Link>
         </div>

      <div className="w-screen absolute  h-40 z-500 bg-linear-to-b from-transparent to-background bottom-0 right-0" />
    </section>
  );
};
