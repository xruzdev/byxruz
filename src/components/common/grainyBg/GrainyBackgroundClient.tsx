import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAnimationsStore } from "@/store";

export default function GrainyBackgroundClient() {
  const grainyBgRef = useRef<HTMLDivElement>(null);

  const { isPreloading, currentTheme } = useAnimationsStore();

  useGSAP(
    () => {
      if (!grainyBgRef.current) return;

      if (!isPreloading) {
        gsap.to(grainyBgRef.current, {
          opacity: currentTheme === "dark" ? 0.4 : 0.15,
          duration: 0.5,
        });
      }
    },
    {
      scope: grainyBgRef,
      dependencies: [isPreloading],
    }
  );

  if (window.innerWidth < 768) return;

  return (
    <div ref={grainyBgRef} className=" opacity-0 fragment hidden lg:flex " />
  );
}
