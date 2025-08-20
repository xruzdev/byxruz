"use client";
import { Marquee } from "@/components/common/marquee-css/Marquee";
import { useAnimationsStore } from "@/store";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const ctaLayer1 = useRef<HTMLDivElement | null>(null);
  const ctaLayer2 = useRef<HTMLDivElement | null>(null);

  const { canAnimate, currentTheme, setOverHero, setCursorSize } =
    useAnimationsStore();

  const router = useRouter();

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
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "power4.out",
          },
          0
        )
        .to(
          "a",
          {
            y: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          ".marquee--inner p",
          {
            y: "0.07px",
            delay: 0.1,
            duration: 1,
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
      className=" w-screen    flex flex-col items-start justify-end lg:justify-end relative p-4 pb-20 gap-4 md:p-10 lg:px-5 xl:px-10 md:pb-5 lg:pb-20 xl:pb-25 2xl:pb-30 h-screen lg:h-[110vh]"
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
        className="absolute  top-0     left-0 grayscale object-cover w-full h-full   -z-10 "
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
          "font-display  text-3xl lg:text-2xl xl:text-3xl text-background " +
          (currentTheme === "light" ? "border-b pb-1 " : "")
        }
        direction="left"
      />

      <div className="flex justify-between items-center w-full">
        <h1
          data-scroll-horizontal
          data-scroll-speed="0.9"
          className="head-title      overflow-hidden "
        >
          <span className=" text-5xl md:!font-display text-light  block translate-y-28 font-bold uppercase md:text-6xl lg:text-7xl 2xl:text-9xl">
            developed by <span className="text-orange !font-display">xruz</span>
          </span>
        </h1>

        <div
          data-scroll-horizontal
          data-scroll-speed="-0.9"
          className="lg:flex justify-evenly items-center  w-1/4 h-15 2xl:h-20 hidden overflow-hidden"
        >
          <Link
            onMouseEnter={() => {
              setCursorSize(0);

              
              if (ctaLayer1.current) {
                ctaLayer1.current.style.clipPath = "circle(105% at 50% 50%)";
              }
            }}
            onMouseLeave={() => {
              setCursorSize(20);

              if (ctaLayer1.current) {
                ctaLayer1.current.style.clipPath = "circle(0% at 50% 50%)";
              }
            }}
            onClick={(e) => {
              e.preventDefault();
              setCursorSize(0);
              gsap
                .to("main", {
                  opacity: 0,
                  duration: 0.5,
                })
                .then(() => {
                  router.push("/contact");
                });
              // Add your custom click handling logic here
            }}
            href="/contact"
            className="translate-y-25 relative bg-transparent text-light border border-orange uppercase justify-center font-bold  flex items-center rounded-lg h-3/4 w-2/5"
          >
            <span>contacto</span>

            <div
              ref={ctaLayer1}
              style={{
                clipPath: "circle(0% at 50% 50%)",
                transition:
                  "clip-path 0.8s ease-in-out",
              }}
              className={
                "btn-layer size-full bg-orange absolute top-1/2 left-1/2 -translate-1/2 -translate-x-1/2 -z-20 rounded-lg " +
                `explore-overlay`
              }
            />
          </Link>
          <Link
           onMouseEnter={() => {
              setCursorSize(0);

              
              if (ctaLayer2.current) {
                ctaLayer2.current.style.clipPath = "circle(105% at 50% 50%)";
              }
            }}
            onMouseLeave={() => {
              setCursorSize(20);

              if (ctaLayer2.current) {
                ctaLayer2.current.style.clipPath = "circle(0% at 50% 50%)";
              }
            }}
            onClick={(e) => {
              e.preventDefault();
              setCursorSize(0);
              gsap
                .to("main", {
                  opacity: 0,
                  duration: 0.5,
                })
                .then(() => {
                  router.push("/work");
                });
            }}
            href="/work"
            className="translate-y-25 relative bg-transparent text-light border border-orange uppercase justify-center font-bold  flex items-center rounded-lg h-3/4 w-2/5"
          >
            <span>Mi trabajo</span>

            <div
              ref={ctaLayer2}
              style={{
                clipPath: "circle(0% at 50% 50%)",
                transition:
                  "clip-path 0.8s ease-in-out, opacity 0.5s ease-in-out",
              }}
              className={
                "btn-layer size-full bg-orange absolute top-1/2 left-1/2 -translate-1/2 -translate-x-1/2 -z-20 rounded-lg " +
                `explore-overlay`
              }
            />
          </Link>
        </div>
      </div>

      <Marquee
        text="sistemas creativos"
        className={
          "font-display    text-3xl lg:text-2xl xl:text-3xl text-background" +
          (currentTheme === "light" ? " border-t pt-1" : "")
        }
        direction="right"
      />

      <div className="flex justify-evenly items-center  w-full h-15 lg:hidden overflow-hidden">
        <Link
          onClick={(e) => {
            e.preventDefault();

            gsap
              .to("main", {
                opacity: 0,
                duration: 0.5,
              })
              .then(() => {
                router.push("/contact");
              });
            // Add your custom click handling logic here
          }}
          href="/contact"
          className="translate-y-15 bg-transparent text-light border border-orange uppercase justify-center font-bold  flex items-center rounded-lg h-3/4 w-2/5"
        >
          contacto
        </Link>
        <Link
          onClick={(e) => {
            e.preventDefault();
            gsap
              .to("main", {
                opacity: 0,
                duration: 0.5,
              })
              .then(() => {
                router.push("/work");
              });
          }}
          href="/work"
          className="translate-y-15 bg-transparent text-light border border-orange uppercase justify-center font-bold  flex items-center rounded-lg h-3/4 w-2/5"
        >
          Mi Trabajo
        </Link>
      </div>
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
