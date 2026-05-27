/* eslint-disable @next/next/no-img-element */
"use client";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useRef } from "react";

import Copy from "@/components/common/Copy";
import { useAppStore } from "@/lib/app-store";
import Link from "next/link";

export const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  const { setCursorSize } = useAppStore();

 

  useGSAP(
    () => {
      if (!aboutRef.current) return;

      const mm = gsap.matchMedia();

      let start = "top 80%";
      mm.add("(width>=48rem)", () => {
        start = "top 65%";
      });
      mm.add("(width>=64rem)", () => {
        start = "top 50%";
      });

      ScrollTrigger.create({
        trigger: aboutRef.current,
        start,
        end: "bottom 50%",
        toggleActions: "play none none reverse",
        animation: gsap.to(".link-container", {
          x: 0,
          ease: "power2.out",
          duration: 1.5,
        }),
      });
    },
    {
      scope: aboutRef,
    },
  );

  return (
    <section
      id="about"
      ref={aboutRef}
      className="w-screen overflow-hidden min-h-[50vh] pt-10  gap-10 md:gap-20 lg:gap-0 lg:py-0  px-6 md:px-20 lg:px-26     flex flex-col lg:flex-row  items-center lg:items-center justify-start lg:justify-evenly  relative"
    >
      <div className="text-base leading-8 about-text text-center   lg:text-start   relative w-full  lg:w-[65%] 2xl:w-[45%] ">
        <Copy>
          <p className="split will-change-transform">
            Creo sitios y sistemas web con un enfoque moderno, visual y
            altamente funcional. Ayudo a agencias, marcas y emprendedores que
            buscan destacar en el mundo digital.
          </p>
        </Copy>
      </div>
      <div
        className="
translate-x-200
link-container will-change-transform"
      >
        <Link
          href="/about"
          onClick={(e) => {
            e.preventDefault();
            setCursorSize(0);
            
          }}
          onMouseEnter={() => setCursorSize(0)}
          onMouseLeave={() => setCursorSize(20)}
          className="link lg:hover:shadow-2xl delay-150    relative lg:hover:scale-105 lg:active:scale-95 group shadow-orange   duration-1000  ease-out   size-40 md:size-44 lg:size-35 xl:size-44  border border-orange rounded-full flex items-center justify-center "
        >
          <h1 className=" font-display text-2xl lg:text-xl xl:text-3xl text-center font-bold lg:group-hover:scale-0 duration-500 uppercase flex gap-2 overflow-hidden">
            <span className="block  ">Sobre</span>{" "}
            <span className="  text-orange block"> mí</span>
          </h1>

          <img
            src="/xruz-logo-2.png"
            alt="About Image"
            className="absolute top-0 animate-fly left-0 lg:group-hover:scale-50 duration-500 scale-0 size-full object-contain"
          />
          <img
            src="/about-link-dark.png"
            alt="About Image"
            className="absolute top-0 animate-rotate delay-100 left-0 lg:group-hover:scale-140 duration-500 scale-1 size-full object-contain"
          />
        </Link>
      </div>
    </section>
  );
};

//. Ayudo a agencias, marcas y emprendedores que buscan destacar en digital.
/**
 * 
 * <div className="text-3xl lg:text-4xl text-start lg:leading-12 relative w-full">
        <p className="overflow-hidden">
          <span className="translate-y-20 block">
            Creo sitios y sistemas web con un enfoque
          </span>
        </p>
        <p className="overflow-hidden">
          <span className="translate-y-20 block">
            moderno, visual y altamente funcional.
          </span>
        </p>
        <p className="overflow-hidden">
          <span className="translate-y-20 block">
            {" "}
            Ayudo a agencias, marcas y emprendedores
          </span>
        </p>
        <p className="overflow-hidden">
          <span className="translate-y-20 block">
            que buscan destacar en el mundo digital.
          </span>
        </p>

        
      </div>
 */
