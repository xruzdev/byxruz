"use client";
import { ProjectSlider } from "@/components/common/ProjectSlider/ProjectSlider";
import { useAppStore } from "@/lib/app-store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef } from "react";

export const WorkContainer = () => {
  const workRef = useRef<HTMLDivElement>(null);
  const { setCursorSize } = useAppStore();

  useGSAP(
    () => {
      if (!workRef.current) return;
      gsap.to("h1, .slider-wrap", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      });
    },
    { scope: workRef },
  );

  return (
    <section
      ref={workRef}
      id="work"
      className="w-screen overflow-hidden py-28 lg:py-40 px-4  flex flex-col gap-16 items-center relative"
    >
      <h1 className="overflow-hidden text-center opacity-0 w-full">
        <span className="font-display font-bold uppercase text-6xl md:text-8xl lg:text-8xl 2xl:text-9xl">
          Mi trabajo
          <span className="text-main">.</span>
        </span>
      </h1>

      <div className="slider-wrap w-full opacity-0 translate-y-8">
        <ProjectSlider />
      </div>

      <div className="w-full flex flex-col items-start justify-center mt-10 md:px-10 lg:px-20 xl:px-30">
        <div className="flex flex-col lg:flex-row justify-start items-start w-full lg:justify-between lg:items-end">
          <h2 className="overflow-hidden text-start">
            <span className="font-display font-bold uppercase text-6xl md:text-8xl lg:text-8xl 2xl:text-9xl">
              Keep in touch
              <span className="text-main">.</span>
            </span>
          </h2>

          <Link
            href="/contact"
            className="cursor-pointer px-6 py-3 my-10 lg:my-0 lg:mb-4 bg-main text-background text-sm font-bold uppercase rounded-lg lg:hover:bg-main/80 transition-colors duration-300"
            onMouseEnter={() => setCursorSize(0)}
            onMouseLeave={() => setCursorSize(20)}
          >
            <span className="z-10">Contactame !</span>
          </Link>
        </div>

        <div className="line h-px bg-main w-full xl:mt-10"></div>

        <p className="my-8">
          <span className="block text-lg">Email:</span>
          <span className="block text-2xl text-main">info@byxruz.com</span>
        </p>

        <div className="line h-px bg-main w-full"></div>
      </div>
    </section>
  );
};
