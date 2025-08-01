/* eslint-disable @next/next/no-img-element */
"use client";
import { useAnimationsStore } from "@/store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useRef } from "react";

export const Contact = () => {
  const contactRef = useRef<HTMLDivElement>(null);

  

  const { setCursorSize, setCanAnimate,currentTheme } = useAnimationsStore();
  const { push } = useRouter();

  const pathName = usePathname();


  useGSAP(
    () => {
      if (!contactRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      mm.add("(width<64rem)", () => {
        if (!contactRef.current) return;

        gsap.to(".mobile-h3, .mobile-p, .mobile-link-container  ", {
          opacity: 1,
          ease: "linear",
          y: 0,
          scrollTrigger: {
            trigger: ".mobile-h3",
            start: "-20% 60%",
            end: "120% 60%",

            scrub: 1,
          },
        });
      });

      mm.add("(width>=64rem)", () => {
        if (!contactRef.current) return;

        const split = new SplitText("h3", {
          type: "chars",
        });

        gsap.to(contactRef.current.querySelector("a"), {
          scrollTrigger: {
            trigger: contactRef.current.querySelector(".link-container"),
            start: "-200% 80%",
            end: "100% 80%",
            scrub: 1,
          },
          y: "-=400px",
          scale: 1.8,
        });

        gsap.from(split.chars, {
          scrollTrigger: {
            trigger: contactRef.current.querySelector(".pin-container"),
            start: "top 0%",
            end: "100% 0%",

            scrub: true,
          },
          opacity: 0.1,
          stagger: 0.2,
          ease: "none",
        });

        gsap.to(".panel", {
          scrollTrigger: {
            trigger: contactRef.current.querySelector(".pin-container"),
            start: "top 0%",
            end: "60% 0%",

            scrub: true,
          },
          x: "-100%",
          ease: "none",
        });
      });
    },
    {
      scope: contactRef,
      dependencies: [pathName],
      revertOnUpdate: true,
    }
  );

  return (
    <>
      <section
        ref={contactRef}
        className="h-auto min-h-[85vh] w-screen flex flex-col items-center justify-center lg:block"
      >
        {/*Desktop */}
        <div className="hidden  pin-container  lg:h-[285vh] relative lg:flex items-start justify-start">
          <div className="panel sticky top-0 left-0 w-screen h-screen flex flex-nowrap items-start justify-start">
            <div className="absolute top-0 left-0 w-[200%] h-screen flex items-center justify-center overflow-hidden ">
              <h3 className="  text-8xl xl:text-9xl 2xl:text-[12rem] font-bold text-center uppercase ">
                Dale, empecemos algo juntos{" "}
                <span className="text-orange">.</span>
              </h3>
            </div>
          </div>
        </div>

        <div className="link-container  hidden lg:block  ">
          <Link
            onClick={(e) => {
              e.preventDefault();

              gsap
                .to("main", {
                  opacity: 0,
                  duration: 0.5,
                })
                .then(() => {
                  setCanAnimate(false);
                  push("/contact");
                });
            }}
            //ref={linkRef}
            onMouseEnter={() => {
              setCursorSize(0);
            }}
            onMouseLeave={() => {
              setCursorSize(20);
            }}
            href="/contact"
            className="  mx-auto hidden lg:flex translate-y-60 2xl:translate-y-50 lg:size-27 relative xl:size-32 border border-orange rounded-full  items-center justify-center"
          >
            <img
              src={currentTheme === "dark" ? "/contact-link-dark.png" : "/contact-link-light.png"}
              alt="contact"
              className="size-[84%]  absolute animate-rotate-fast"
            />
            <div className="size-[50%] border rounded-full  border-orange flex items-center justify-center">
              <img
                src="/xruz-logo-2.png"
                alt="logo"
                className="object-contain size-1/2  "
              />
            </div>

            {/*   */}
          </Link>
        </div>

        {/*Mobile */}
        <h3 className="mobile-h3 !font-text  opacity-10 mt-30 text-5xl md:text-7xl font-bold text-center uppercase lg:hidden px-3">
          Empecemos a trabajar juntos <span className="text-orange">.</span>
        </h3>

        <p className="text-lg mobile-p opacity-10 text-center my-5 text-forground w-[90%] lg:hidden">
          Que piensas sobre embarcar en un viaje de innovación y creatividad?{" "}
          <br className="hidden md:block lg:hidden" /> Hace realidad tus ideas y
          llevemos tu proyecto al siguiente nivel.
        </p>

        <div className="opacity-0 translate-y-50 2xl:translate-y-50 mobile-link-container w-full z-500 flex items-center justify-center">
          <Link
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              setCursorSize(0);
              setCanAnimate(false);
              gsap
                .to("main", {
                  opacity: 0,
                  duration: 0.5,
                })
                .then(() => {
                  push("/contact");
                });
            }}
            className="mobile-link bg-orange   mb-30 mt-10 uppercase text-background z-500 lg:hidden relative xl:mt-10 text-base  px-14 py-4  rounded-[45px] active:scale-95 transition-all duration-500 ease-linear hover:scale-105  hover:text-background"
          >
            Contactame
          </Link>
        </div>
      </section>
    </>
  );
};

/*
 */
