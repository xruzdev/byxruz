"use client";
import { Marquee } from "@/components/common/marquee-css/Marquee";
import { useAnimationsStore } from "@/store";
import { useGSAP } from "@gsap/react";
//import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const { canAnimate, currentTheme, setOverHero } = useAnimationsStore();

  useGSAP(
    () => {

      
      
      if (!heroRef.current) return;
      setOverHero(true);

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "85% top",
        onEnter: () => setOverHero(true),
        onLeave: () => setOverHero(false),
        onEnterBack: () => setOverHero(true),
        onLeaveBack: () => setOverHero(false),
      });

      tl.current = gsap
        .timeline({
          paused: true,
        })
        .to("h1 span", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.inOut",
        })
        .to(
          ".marquee",
          {
            opacity: 1,
            width: "110%",
            duration: 2,
            ease: "power4.inOut",
          },
          0
        )
        .to(
          ".marquee--inner p",
          {
            y: "0.07px",

            duration: 2,
          },
          0
        )

        .to(
          "img",
          {
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
          },
          0
        );
    },
    { scope: heroRef }
  );

  useEffect(() => {
    if (!tl.current) return;

    if (canAnimate) {
      tl.current.play();
    }
  }, [canAnimate]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className=" w-screen    flex flex-col items-start justify-end lg:justify-end relative p-4 pb-20 gap-4 md:p-10 md:pb-20  xl:pb-25 2xl:pb-30 h-screen lg:h-[110vh]"
    >
      {/*  <video
        src="/bg-try-3.mp4"
        autoPlay
        loop
        muted
        className="absolute opacity-0 top-0     left-0 grayscale object-cover w-full h-full brightness-50 -z-10 contrast-150"
      /> */}

      <Image
        src="/images/bg-def.jpg"
        fill
        data-scroll
        data-scroll-speed="-1"
        alt="background"
        className="absolute opacity-0 top-0     left-0 grayscale object-cover w-full h-full   -z-10 "
      />

      {currentTheme !== "light" && (
        <div className="absolute bottom-0 left-0 h-50 w-full  bg-gradient-to-b from-transparent to-background   -z-5" />
      )}

      {/*   <span className="text-xl md:text-3xl    uppercase font-black">
        Juan Cruz Elias
      </span> */}

      <Marquee
        text="desarrollo web"
        className={
          "font-display text-3xl text-background " +
          (currentTheme === "light" ? "border-b pb-1 " : "")
        }
        direction="left"
      />

      <h1
        data-scroll-horizontal
        data-scroll-speed="0.9"
        className="head-title      overflow-hidden "
      >
        <span className=" text-5xl md:!font-display text-light  block translate-y-28 font-bold uppercase md:text-6xl lg:text-7xl 2xl:text-9xl">
          developed by <span className="text-orange !font-display">xruz</span>
        </span>
      </h1>
      <Marquee
        text="sistemas creativos"
        className={
          "font-display   text-3xl text-background" +
          (currentTheme === "light" ? " border-t pt-1" : "")
        }
        direction="right"
      />
    </section>
  );
};

/**
 *
 *
 */

/**
 * 
 *  <div className="video-container relative h-90 md:h-80 rounded-2xl w-full overflow-hidden">
        <video
          src="/bg-try-2.mp4"
          autoPlay
          loop
          muted
          className="  object-cover grsayscale  size-full rounded-2xl translate-y-full"
        />

        <div className="absolute h-95 top-0 left-1/4 w-6 md:w-10 lg:w-6 xl:w-10 bg-background"></div>
        <div className="absolute h-full top-0 left-2/4 w-6 md:w-10 lg:w-6 xl:w-10 bg-background"></div>
      </div>
 */
