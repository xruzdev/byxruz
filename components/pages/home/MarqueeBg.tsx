"use client";

import { useGSAP, gsap, SplitText } from "@/lib/gsap";
import { horizontalLoop } from "@/lib/utils";
import { useLenis } from "lenis/react";

import { useEffect, useRef } from "react";

export const MarqueeBg = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const tl1Ref = useRef<gsap.core.Timeline | null>(null);
  const tl2Ref = useRef<gsap.core.Timeline | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = (event: { velocity: number }) => {
      const nextScale =
        event.velocity === 0 ? 1 : gsap.utils.clamp(-3, 3, event.velocity);

      tl1Ref.current?.timeScale(nextScale);
      tl2Ref.current?.timeScale(nextScale);
    };

    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  useGSAP(
    () => {
      if (!marqueeRef.current) return;

      const q = gsap.utils.selector(marqueeRef);
      const textEl = q(".text")[0] as HTMLElement | undefined;
      const items1 = q(".panel-1 .item") as HTMLElement[];
      const items2 = q(".panel-2 .item") as HTMLElement[];
      const allItems = [...items1, ...items2];

      if (allItems.length) {
        gsap.set(allItems, { willChange: "transform" });
      }
      if (textEl) {
        gsap.set(textEl, { willChange: "opacity" });
      }

      let split: SplitText | null = null;

      const mm = gsap.matchMedia();

      mm.add("(width < 768px)", () => {
        if (!textEl) return;

        gsap.from(textEl, {
          opacity: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: "top 50%",
            end: "bottom 50%",
            scrub: 1,
          },
        });
      });

      mm.add("(width >= 768px)", () => {
        if (!textEl) return;

        split = new SplitText(textEl, { type: "chars" });

        gsap.from(split.chars, {
          opacity: 0.1,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: "top 75%",

            end: "bottom 75%",
            scrub: 1,
          },
        });

        return () => {
          split?.revert();
          split = null;
        };
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

      return () => {
        mm.revert();
        tl1Ref.current?.kill();
        tl2Ref.current?.kill();
        tl1Ref.current = null;
        tl2Ref.current = null;

        if (allItems.length) {
          gsap.set(allItems, { clearProps: "willChange" });
        }
        if (textEl) {
          gsap.set(textEl, { clearProps: "willChange" });
        }
      };
    },
    {
      scope: marqueeRef,
    },
  );

  return (
    <div
      ref={marqueeRef}
      className="flex my-10 md:my-20 xl:mt-40 flex-col font-bold tracking-normal relative uppercase text-nowrap   text-main/20 lg:text-main/40 items-center justify-center w-full h-auto  overflow-hidden   "
    >
      <div className="absolute bottom-0  left-0   h-full w-15 md:w-36   bg-linear-to-r from-background to-transparent -z-10 "></div>
      <div className="absolute bottom-0  right-0   h-full w-15 md:w-36   bg-linear-to-l from-background to-transparent -z-10 "></div>

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
              <rect x="1" y="1" width="14" height="14" fill="var(--main)" />
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
              <rect x="1" y="1" width="14" height="14" fill="var(--main)" />
            </svg>
          </h4>
        ))}
      </div>
    </div>
  );
};
