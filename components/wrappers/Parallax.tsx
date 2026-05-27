"use client";

import { gsap, useGSAP } from "@/lib/gsap";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";


type ParallaxProviderProps = {
  children: ReactNode;
};

export function Parallax({ children }: ParallaxProviderProps) {
  const pathname = usePathname();
  useGSAP(
    () => {
      const elements = gsap.utils.toArray("[data-scroll]") as HTMLElement[];

      const mm = gsap.matchMedia();

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

      mm.add("(width>=1024px)", () => {
        const horizontal = gsap.utils.toArray(
          "[data-scroll-horizontal]"
        ) as HTMLElement[];
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
      });
    },
    {
      dependencies: [pathname],

      revertOnUpdate: true,
    }
  );

  return <>{children}</>;
}
