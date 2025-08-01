"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

type ParallaxProviderProps = {
  children: ReactNode;
};

export function ParallaxProvider({ children }: ParallaxProviderProps) {
  const pathname = usePathname();
  useGSAP(
    () => {
      const elements = gsap.utils.toArray("[data-scroll]") as HTMLElement[];
      const horizontal = gsap.utils.toArray(
        "[data-scroll-horizontal]"
      ) as HTMLElement[];

      elements.forEach((el) => {
        let speed = Number(el.dataset.scrollSpeed) || 0;

        if (window.innerWidth < 768) {
          speed = speed / 2;
        }

        gsap.to(el, {
          y: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      if (window.innerWidth < 768) return;

      horizontal.forEach((el) => {
        const speed = Number(el.dataset.scrollSpeed) || 0;
        

        gsap.to(el, {
          x: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    },
    {
      dependencies: [pathname],

      revertOnUpdate: true,
    }
  );

  return <>{children}</>;
}
