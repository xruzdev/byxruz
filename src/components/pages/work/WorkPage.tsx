/* eslint-disable @next/next/no-img-element */
"use client";
import { projects } from "@/data/projects";
import { useAnimationsStore } from "@/store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export const WorkContainer = () => {
  const workRef = useRef<HTMLDivElement>(null);

  const { push } = useRouter();

  const {
    canAnimate,
    setCanAnimate,
    setCursorSize,
    setCursorColor,
    setCursorText,
  } = useAnimationsStore();

  useGSAP(
    () => {
      if (!workRef.current || !canAnimate) return;

      const mm = gsap.matchMedia();

      gsap.to("h1, .work-item", {
        opacity: 1,

        duration: 1,
        stagger: 0.2,
        ease: "power2.inOut",
      });

      const workItems = gsap.utils.toArray<HTMLElement>(
        ".work-item"
      ) as HTMLElement[];

      mm.add("(width < 768px)", () => {
        workItems.forEach((item, index) => {
          gsap.from(item.querySelector(".panel"), {
            y: 500,

            ease: "linear",
            scrollTrigger: {
              trigger: item,

              start: "top 90%",
              end: "bottom 90%",

              scrub: 1,
            },
          });

          gsap.from(item.querySelector("img"), {
            xPercent: index % 2 === 0 ? 100 : -100,
            rotate: 20,
            duration: 1.5,

            scrollTrigger: {
              trigger: item,
              start: "-20% bottom",
              end: "80% bottom",

              scrub: 1,
            },
          });
        });
      });

      mm.add("(width >= 768px)", () => {
        workItems.forEach((item) => {
          gsap.from([item.querySelector(".panel"), item.querySelector("img")], {
            opacity: 0.2,
            ease: "linear",
            scrollTrigger: {
              trigger: item,

              start: "top 75%",
              end: "bottom 75%",

              scrub: 1,
            },
          });
        });
      });
    },
    {
      scope: workRef,
      dependencies: [canAnimate],
      revertOnUpdate: true,
    }
  );

  return (
    <section
      ref={workRef}
      id="work"
      className="w-screen overflow-hidden   py-28  lg:py-40 gap-20 xl:gap-30     2xl:gap-60 px-4 md:px-10 lg:px-20 xl:px-30  flex flex-col  items-center  relative"
    >
      <h1 className=" overflow-hidden text-center opacity-0  ">
        <span className="font-display    font-bold uppercase text-6xl md:text-8xl lg:text-8xl 2xl:text-9xl">
          Mi trabajo
          <span className="text-orange">.</span>
        </span>
      </h1>

      {projects.map((work, index) => (
        <div
          key={index}
          data-scroll-horizontal
          data-scroll-speed={index % 2 === 0 ? "0.9" : "-0.9"}
          className={
            "work-item w-full opacity-0 h-100 md:h-150 lg:h-60 xl:h-75 2xl:h-100 flex flex-col-reverse    gap-10 lg:gap-0 items-center justify-evenly " +
            (index % 2 === 0 ? "lg:flex-row " : " lg:flex-row-reverse ")
          }
        >
          <div
            className={
              "panel w-full lg:w-2/5 h-full flex flex-col justify-center items-center relative   xl:gap-5   " +
              (index % 2 === 0 ? "lg:items-start" : "lg:items-end")
            }
          >
            <h3
              className={
                "   w-full text-center " +
                (index % 2 === 0 ? "lg:text-left" : "lg:text-right")
              }
            >
              <span className="text-4xl block lg:text-3xl  xl:text-5xl font-display font-bold text-back">
                {work.title}
              </span>
            </h3>

            <p
              className={
                "text-neutral-500 text-lg lg:text-base xl:text-xl text-center " +
                (index % 2 === 0 ? "lg:text-left" : "lg:text-right")
              }
            >
              {work.description}
                {work.title === "Flex Mkt Agency" && (
                <>
                  <br />
                  <span>
                    {" "}
                    Diseño inspirado en la web{" "}
                    <a
                      onMouseEnter={() => {
                        setCursorSize(0);
                      }}
                      onMouseLeave={() => {
                        setCursorSize(20);
                      }}
                      className="border-b"
                      target="_blank"
                      href="https://twicemediahouse.com/"
                    >
                      Twice Media House
                    </a>
                    <br className="hidden lg:block xl:hidden"/>{" "}
                    creada por{" "}
                    <a
                     onMouseEnter={() => {
                        setCursorSize(0);
                      }}
                      onMouseLeave={() => {
                        setCursorSize(20);
                      }}
                      className="border-b"
                      target="_blank"
                      href="https://dennissnellenberg.com/"
                    >
                      Dennis Snellenberg
                    </a>
                    .
                  </span>
                </>
              )}
            </p>

            <Link
              href={work.link}
              target="_blank"
              className="text-orange mt-5 relative xl:mt-10 text-sm border px-6 xl:px-10 py-2 xl:py-4 rounded-[45px] active:scale-95 transition-all duration-500 ease-in hover:scale-105  hover:text-background"
              onMouseEnter={() => {
                setCursorSize(0);
                const overlay = workRef.current?.querySelector(
                  `.overlay-${index}`
                ) as HTMLDivElement;

                if (overlay) {
                  overlay.style.clipPath = "circle(100% at 50% 50%)";
                }
              }}
              onMouseLeave={() => {
                setCursorSize(20);

                const overlay = workRef.current?.querySelector(
                  `.overlay-${index}`
                ) as HTMLDivElement;

                if (overlay) {
                  overlay.style.clipPath = "circle(0% at 50% 50%)";
                }
              }}
            >
              <span className="z-10">Ver página</span>
              <div
                style={{
                  clipPath: "circle(0% at 50% 50%)",
                  transition:
                    "clip-path 0.5s ease-in-out, opacity 0.5s ease-in-out",
                }}
                className={
                  "btn-layer size-full bg-orange absolute top-1/2 left-1/2 -translate-1/2 -translate-x-1/2 -z-20 rounded-[45px] " +
                  `overlay-${index}`
                }
              />
            </Link>

            {/*  <div className="w-3/4 bg-orange h-0.5"></div> */}
          </div>

          <img
            src={work.image}
            alt="work"
            onClick={() => {
              window.open(work.link, "_blank");
            }}
            onMouseEnter={() => {
              setCursorSize(120);
              setCursorColor("var(--color-orange)");
              setCursorText("Ver página");
            }}
            onMouseLeave={() => {
              setCursorSize(20);
              setCursorColor("var(--color-orange)");
              setCursorText("");
            }}
            className="w-full h-3/5 lg:h-full lg:w-3/5 2xl:w-1/2 rounded-2xl object-cover cursor-pointer "
          />
        </div>
      ))}

      <div className="w-full flex flex-col items-start justify-center ">
        <div className="flex flex-col lg:flex-row justify-start items-start  w-full lg:justify-between lg:items-end">
          <h2 className=" overflow-hidden text-start   ">
            <span className="font-display   font-bold uppercase text-6xl md:text-8xl lg:text-8xl 2xl:text-9xl">
             Keep in touch
              <span className="text-orange">.</span>
            </span>
          </h2>

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
            className="cursor-pointer px-6 py-3 my-10 lg:my-0 lg:mb-4 bg-orange text-background text-sm font-bold  uppercase rounded-lg lg:hover:bg-orange/80 transition-colors duration-300  "
            onMouseEnter={() => {
              setCursorSize(0);
            }}
            onMouseLeave={() => {
              setCursorSize(20);
            }}
          >
            <span className="z-10">Contactame !</span>
          </Link>
        </div>

        <div className="line h-0.25 bg-orange w-full xl:mt-10 "></div>

        <p className="my-8">
          <span className="block text-lg">Email:</span>
          <span className=" block text-2xl text-orange">info@byxruz.com</span>
        </p>

        <div className="line h-0.25 bg-orange w-full"></div>
      </div>
    </section>
  );
};
