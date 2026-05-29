/* eslint-disable @next/next/no-img-element */
"use client";
import { featuredProjects } from "@/lib/data/projects";
import { useAppStore } from "@/lib/app-store";

import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import Copy from "@/components/common/Copy";

export const FeaturedWork = () => {
  const featuredRef = useRef<HTMLDivElement>(null);

  const pathName = usePathname();

  const { setCursorSize, setCursorColor, setCursorText } = useAppStore();

  useGSAP(
    () => {
      if (!featuredRef.current) return;

      const q = gsap.utils.selector(featuredRef);
      const header = q(".header")[0] as HTMLElement | undefined;
      const workItems = q(".work-item") as HTMLDivElement[];
      const panels = workItems
        .map((item) => item.querySelector(".panel") as HTMLDivElement | null)
        .filter(Boolean) as HTMLDivElement[];
      const images = workItems
        .map((item) => item.querySelector("img") as HTMLImageElement | null)
        .filter(Boolean) as HTMLImageElement[];

      if (header) {
        gsap.set(header, { willChange: "transform" });
      }
      if (panels.length) {
        gsap.set(panels, { willChange: "transform" });
      }
      if (images.length) {
        gsap.set(images, { willChange: "transform" });
      }

      if (header) {
        ScrollTrigger.create({
          trigger: featuredRef.current,
          start: "top 80%",
          end: "50% 80%",
          toggleActions: "play none none reverse",
          animation: gsap.to(header, {
            force3D: true,
            y: 0,
            rotate: 0,
            duration: 1.5,
            ease: "power4.out",
          }),
        });
      }

      workItems.forEach((item, index) => {
        const panel = item.querySelector(".panel") as HTMLDivElement | null;
        const image = item.querySelector("img") as HTMLImageElement | null;

        if (panel) {
          gsap.from(panel, {
            force3D: true,
            y: 0,
            yPercent: 70,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              end: "bottom 90%",
              toggleActions: "play none none reverse",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }

        if (image) {
          gsap.from(image, {
            force3D: true,
            xPercent: index % 2 === 0 ? 100 : -100,
            rotate: 12,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "-20% bottom",
              end: "80% bottom",
              toggleActions: "play none none reverse",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      });

      return () => {
        if (header) {
          gsap.set(header, { clearProps: "willChange" });
        }
        if (panels.length) {
          gsap.set(panels, { clearProps: "willChange" });
        }
        if (images.length) {
          gsap.set(images, { clearProps: "willChange" });
        }
      };
    },
    { scope: featuredRef, dependencies: [pathName], revertOnUpdate: true },
  );

  return (
    <section
      ref={featuredRef}
      className="w-screen overflow-hidden   pt-20 gap-20 xl:gap-30     2xl:gap-50 px-4 md:px-10 lg:px-20 xl:px-30  flex flex-col  items-center lg:items-start justify-start lg:justify-start relative"
    >
      <div className="header translate-y-50 t h-50 lg:h-40 lg:translate-y-72 flex flex-col md:flex-row items-center justify-center md:items-end md:justify-between w-full">
        <div data-scroll-horizontal data-scroll-speed="0.9" className="">
          <h2 className=" overflow-hidden text-center md:text-left ">
            <span className="font-display!   rotate-12  font-bold uppercase text-6xl md:text-8xl lg:text-8xl 2xl:text-9xl">
              Work
              <span className="text-main">.</span>
            </span>
          </h2>

          <p className="text-neutral-500 text-lg lg:text-base xl:text-xl lg:ml-25">
            Algunos de mis proyectos destacados.
          </p>
        </div>

        <Link
          href="/work"
          className="explore-link text-main mt-5 relative xl:mt-10 text-sm border px-6 xl:px-10 py-2 xl:py-4 rounded-[45px] active:scale-95 transition-all duration-500 ease-in hover:scale-105  hover:text-background"
          onMouseEnter={() => {
            setCursorSize(0);
            const overlay = featuredRef.current?.querySelector(
              `.explore-overlay`,
            ) as HTMLDivElement;

            if (overlay) {
              overlay.style.clipPath = "circle(100% at 50% 50%)";
            }
          }}
          onMouseLeave={() => {
            setCursorSize(20);

            const overlay = featuredRef.current?.querySelector(
              `.explore-overlay`,
            ) as HTMLDivElement;

            if (overlay) {
              overlay.style.clipPath = "circle(0% at 50% 50%)";
            }
          }}
        >
          <span className="z-10">Explora todos mis trabajos</span>
          <div
            style={{
              clipPath: "circle(0% at 50% 50%)",
              transition:
                "clip-path 0.5s ease-in-out, opacity 0.5s ease-in-out",
            }}
            className={
              "btn-layer size-full bg-main absolute top-1/2 left-1/2 -translate-1/2 -translate-x-1/2 -z-20 rounded-[45px] " +
              `explore-overlay`
            }
          />
        </Link>
      </div>

      {featuredProjects.map((work, index) => (
        <div
          key={index}
          className={
            "work-item w-full h-100 md:h-150 lg:h-60 xl:h-75 2xl:h-100 flex flex-col-reverse gap-10 lg:gap-0 items-center justify-evenly " +
            (index % 2 === 0 ? "lg:flex-row  " : " lg:flex-row-reverse  ")
          }
        >
          <div
            className={
              "panel w-full lg:w-2/5 h-full flex flex-col justify-center items-center  xl:gap-5  z-505 " +
              (index % 2 === 0 ? "lg:items-start" : "lg:items-end")
            }
          >
            <Copy start="top 100%">
              <h3
                className={
                  "   w-full text-center " +
                  (index % 2 === 0 ? "lg:text-left" : "lg:text-right")
                }
              >
                <span className="text-4xl  block lg:text-3xl  xl:text-5xl font-bold text-back">
                  {work.title}
                </span>
              </h3>
            </Copy>
            <Copy start="top 100%">
              <p
                className={
                  "text-neutral-500 text-lg lg:text-base xl:text-xl text-center " +
                  (index % 2 === 0 ? "lg:text-left" : "lg:text-right")
                }
              >
                {work.description}
              </p>
            </Copy>

            <Link
              href={work.link}
              target="_blank"
              className="text-main mt-5 relative xl:mt-10 text-sm border px-6 xl:px-10 py-2 xl:py-4 rounded-[45px] active:scale-95 transition-all duration-500 ease-in hover:scale-105  hover:text-background"
              onMouseEnter={() => {
                setCursorSize(0);
                const overlay = featuredRef.current?.querySelector(
                  `.overlay-${index}`,
                ) as HTMLDivElement;

                if (overlay) {
                  overlay.style.clipPath = "circle(100% at 50% 50%)";
                }
              }}
              onMouseLeave={() => {
                setCursorSize(20);

                const overlay = featuredRef.current?.querySelector(
                  `.overlay-${index}`,
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
                  "btn-layer size-full bg-main absolute top-1/2 left-1/2 -translate-1/2 -translate-x-1/2 -z-20 rounded-[45px] " +
                  `overlay-${index}`
                }
              />
            </Link>

            {/*  <div className="w-3/4 bg-main h-0.5"></div> */}
          </div>

          <img
            src={work.image}
            alt="work"
            onClick={() => {
              window.open(work.link, "_blank");
            }}
            onMouseEnter={() => {
              setCursorSize(120);
              setCursorColor("var(--color-main)");
              setCursorText("Ver página");
            }}
            onMouseLeave={() => {
              setCursorSize(20);
              setCursorColor("var(--color-main)");
              setCursorText("");
            }}
            className="w-full h-3/5 lg:h-full lg:w-3/5 2xl:w-1/2  z-0 rounded-2xl object-cover cursor-pointer "
          />
        </div>
      ))}
    </section>
  );
};
