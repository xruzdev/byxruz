"use client";

import { LenisContext } from "@/components/providers/LenisProvider";
import { horizontalLoop } from "@/lib";
import { useAnimationsStore } from "@/store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useContext, useEffect, useRef } from "react";

export const MarqueeBg = () => {
  const { velocity } = useContext(LenisContext);

  const { isTouchDevice } = useAnimationsStore();

  const marqueeRef = useRef<HTMLDivElement>(null);
  const tl1Ref = useRef<gsap.core.Timeline>(null);
  const tl2Ref = useRef<gsap.core.Timeline>(null);

  useGSAP(
    () => {
      if (!marqueeRef.current) return;

      const items1 = gsap.utils.toArray<HTMLElement>(
        ".panel-1 .item"
      ) as HTMLElement[];
      const items2 = gsap.utils.toArray<HTMLElement>(
        ".panel-2 .item"
      ) as HTMLElement[];

      const mm = gsap.matchMedia();

      mm.add("(width < 768px)", () => {
        gsap.from(".text", {
          opacity: 0.1,
          ease: "linear",
          stagger: 0.5,
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: "top 50%",
            end: "bottom 50%",
            scrub: 1,
          },
        });
      });

      mm.add("(width >= 768px)", () => {
        const text = new SplitText(".text", { type: "chars" });

        gsap.from(text.chars, {
          opacity: 0.1,
          ease: "linear",
          stagger: 0.5,
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: "top 75%",

            end: "bottom 75%",
            scrub: 1,
          },
        });
      });

      tl1Ref.current = horizontalLoop(items1, {
        speed: 0.1,
        repeat: -1,
        paddingLeft: 100,
        ease: "linear",
      });

      tl2Ref.current = horizontalLoop(items2, {
        speed: 0.3,
        repeat: -1,
        ease: "linear",
        paddingLeft: 100,
        reversed: true,
      });
    },
    {
      scope: marqueeRef,
    }
  );

  useEffect(() => {
    if (!tl1Ref.current || !tl2Ref.current || isTouchDevice) return;

    tl1Ref.current.timeScale(velocity);
    tl2Ref.current.timeScale(velocity);

    if (velocity === 0) {
      tl1Ref.current.timeScale(1);
      tl2Ref.current.timeScale(1);
    }
  }, [velocity, isTouchDevice]);

  return (
    <div
      ref={marqueeRef}
      className="flex my-10 md:my-20 xl:mt-40 flex-col font-bold tracking-[0px] relative uppercase text-nowrap   text-orange/20 lg:text-orange/40 items-center justify-center w-full h-auto  overflow-hidden   "
    >
      <div className="absolute bottom-0  left-0   h-full w-15 md:w-36   bg-gradient-to-r from-background to-transparent -z-10 "></div>
      <div className="absolute bottom-0  right-0   h-full w-15 md:w-36   bg-gradient-to-l from-background to-transparent -z-10 "></div>

      <div className="panel-1 w-auto   text-8xl  2xl:text-[15rem] -z-15 2xl:leading-70  flex justify-start items-center gap-5 md:gap-8 lg:gap-15 2xl:gap-20 overflow-hidden flex-nowrap ">
        {[
          "Sitios web",
          "Aplicaciones web",
          "Diseño web",
          "Visión creativa",
          "Experiencias interactivas",
        ].map((text, index) => (
          <h4
            className="item flex gap-5 md:gap-8 lg:gap-15 2xl:gap-20 items-center"
            key={index}
          >
            {text}{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 md:size-6 lg:size-8 2xl:size-10 opacity-40"
              viewBox="0 0 16 16"
              fill="none"
            >
              <rect x="1" y="1" width="14" height="14" fill="var(--orange)" />
            </svg>
          </h4>
        ))}
      </div>

      <span className="  z-500 text text-xs  my-5 md:text-sm xl:text-lg text-forground w-[90%] md:w-4/5  lg:w-3/5 text-foreground  text-center mx-auto text-wrap">
        Una buena experiencia de usuario es fundamental para el éxito de
        cualquier negocio en línea. Esto implica una navegación sencilla, un
        diseño atractivo y un rendimiento rápido, factores que generan
        confianza, aumentan la interacción y potencian las ventas. Además, el
        uso de las últimas tecnologías garantiza compatibilidad, accesibilidad,
        facilidad de desarrollo y seguridad, ofreciendo innovación y calidad en
        cada proyecto.
      </span>

      <div className="panel-2 w-auto   text-8xl -z-15  2xl:text-[15rem] 2xl:leading-70 flex justify-start items-center gap-5 md:gap-8 lg:gap-15 2xl:gap-20 overflow-hidden flex-nowrap">
        {[
          "Animaciones",
          "Interactividad",
          "Diseño",
          "Desarrollo",
          "Alta performance",
        ].map((text, index) => (
          <h4
            className="item flex gap-5 md:gap-8 lg:gap-15 2xl:gap-20 items-center"
            key={index}
          >
            {text}{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 md:size-6 lg:size-8 2xl:size-10 opacity-40"
              viewBox="0 0 16 16"
              fill="none"
            >
              <rect x="1" y="1" width="14" height="14" fill="var(--orange)" />
            </svg>
          </h4>
        ))}
      </div>
    </div>
  );
};
