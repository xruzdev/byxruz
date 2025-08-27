/* eslint-disable react-hooks/exhaustive-deps */
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";
import { useAnimationsStore } from "@/store";
import { CustomEase } from "gsap/CustomEase";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export const Menu = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const btnOverlay = useRef<HTMLDivElement>(null);
  const tlMenuRef = useRef<gsap.core.Timeline | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [openMenu, setOpenMenu] = useState(false);
  //const [selectedRoute, setSelectedRoute] = useState("");
  const [isReversed, setIsReversed] = useState(false);

  const { setCanAnimate, setCanScroll, setCursorSize, currentTheme, overHero } =
    useAnimationsStore();

  const pathname = usePathname();
  const { push } = useRouter();

  /*   useEffect(() => {
    if (selectedRoute != "" && isReversed && pathname !== selectedRoute) {
      setCanAnimate(false);
      window.location.assign(selectedRoute);
    }
  }, [selectedRoute, isReversed, pathname]); */

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.registerPlugin(ScrollTrigger, CustomEase);

      CustomEase.create("myEase", "M0,0 C1,0 0.492,1 1,1 ");

      let width = "calc(100vw - 1.5rem)";
      let height = "calc(100dvh - 3rem)";

      const mm = gsap.matchMedia();
      mm.add("(width>=48rem)", () => {
        width = "calc(100vw - 5rem)";
        height = "calc(100vh - 5rem)";
      });

      mm.add("(width>=64rem)", () => {
        width = "35vw";
        height = "calc(100vh - 3rem)";
      });

      mm.add("(width>=80rem)", () => {
        width = "30vw";
        height = "calc(100vh - 5rem)";
      });

      tweenRef.current = gsap.to(".btn-layer", {
        duration: 0.5,
        clipPath: "circle(50% at 50% 50%)",
        paused: true,
      });

      tlMenuRef.current = gsap
        .timeline({
          paused: true,
          onStart: () => {
            setIsReversed(false);
          },
          defaults: { ease: "power4.inOut" },
          onReverseComplete: () => {
            setIsReversed(true);
          },
        })
        .to("#line1", {
          duration: 0.5,
          ease: "power2.out",
          attr: {
            x1: 6,
            y1: 8,
            x2: 26,
            y2: 28,
          },
        })
        .to(
          "#line2",
          {
            duration: 0.5,
            attr: {
              x1: 6,
              y1: 28,
              x2: 26,
              y2: 8,
            },
            ease: "power2.out",
          },
          "<"
        )
        .to(
          containerRef.current,
          {
            width,

            height,
            delay: -0.2,
            duration: 1.5,
          },
          "<"
        )
        /*    .to(containerRef.current, {
        delay: -0.2,
        duration: 1,
      }) */
        /* .to(
          ".wrapper",
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",

            duration: 1.5,
          },
          "<"
        ) */
        .to(".link-item", {
          y: "0",
          delay: -1,
          duration: 1,
          stagger: 0.075,
          ease: "power2.inOut",
        });
    },
    {
      scope: containerRef,
    }
  );

  useEffect(() => {
    if (!tlMenuRef.current) return;

    if (openMenu) {
      tlMenuRef.current.play();

      setCursorSize(0);

      setCanScroll(false);
    } else {
      tlMenuRef.current.reverse();
      setCanScroll(true);
      setCursorSize(20);
    }
  }, [openMenu, setCanScroll]);

  //w-[calc(100vw-2rem)] md:w-[calc(100vw-5rem)]  h-[calc(100dvh-2rem)]  md:h-[calc(100vh-5rem)]

  return (
    <>
      <aside
        ref={containerRef}
        id="menu"
        className="opacity-0 size-15 fixed top-6 md:top-10 z-555 lg:top-6 xl:top-10 right-4 md:right-10 lg:right-6 xl:right-10  flex flex-col justify-start items-end  overflow-hidden  rounded-xl md:rounded-2xl bg-transparent  border border-orange "
      >
        <button
          id="menu-button"
          onClick={() => setOpenMenu(!openMenu)}
          type="button"
          aria-label="Menu Button"
          aria-expanded="false"
          aria-controls="menu"
          onMouseEnter={() => {
            setCursorSize(0);
            if (btnOverlay.current) {
              btnOverlay.current.style.clipPath = "circle(50% at 50% 50%)";
            }
          }}
          onMouseLeave={() => {
            if (!openMenu) setCursorSize(20);
            if (btnOverlay.current) {
              btnOverlay.current.style.clipPath = "circle(0% at 50% 50%)";
            }
          }}
          data-state="closed"
          data-orientation="vertical"
          className="cursor-pointer  flex  relative  border-0  flex-col gap-2  text-foreground   items-center justify-center      rounded-2xl size-15    "
        >
          <svg
            id="menu-icon"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            className="z-20 size-10 "
          >
            <line
              x1="2"
              y1="14"
              x2="30"
              y2="14"
              stroke={
                currentTheme === "light" && overHero
                  ? "var(--color-light)"
                  : "currentColor"
              }
              strokeWidth="1.5"
              id="line1"
            />
            <line
              x1="10"
              y1="18"
              x2="30"
              y2="18"
              stroke={
                currentTheme === "light" && overHero
                  ? "var(--color-light)"
                  : "currentColor"
              }
              strokeWidth="1.5"
              id="line2"
            />
          </svg>

          <div
            ref={btnOverlay}
            style={{
              clipPath: "circle(0% at 50% 50%)",
              transition:
                "clip-path 0.5s ease-in-out, opacity 0.5s ease-in-out",
              opacity: isReversed ? 1 : 0,
            }}
            className="btn-layer size-20 bg-orange absolute top-1/2 left-1/2 -translate-1/2 -translate-x-1/2 z-0"
          ></div>
        </button>

        <div
          /* style={{
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
          }} */

            style={{
              color: currentTheme  === "light" && overHero ? "var(--color-light)" : "var(--color-foreground)",
            }}
          className="top-15 md:top-20 left-0  wrapper w-full h-[calc(100dvh-6rem)] md:h-[calc(100vh-8rem)]  px-6   md:px-10   absolute text-xl flex   flex-col justify-evenly items-center      rounded-2xl md:rounded-3xl overflow-hidden"
        >
          <span className="text-sm  ">Menu</span>

          <div className="w-full h-0.25 bg-orange"></div>

          {[
            { title: "Home", href: "/" },
            { title: "Trabajo", href: "/work" },
            { title: "About", href: "/about" },
            { title: "Contacto", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();

                if (pathname === item.href) return;
                tlMenuRef.current?.reverse().then(() => {
                  setOpenMenu(false);
                  setCanAnimate(false);

                  gsap
                    .to(document.body.querySelector("main"), {
                      opacity: 0,
                      duration: 0.5,
                      ease: "power2.inOut",
                    })
                    .then(() => {
                      push(item.href);
                    });
                });
              }}
              className="menu-link  overflow-hidden py-1 text-5xl md:text-6xl lg:text-4xl xl:text-5xl font-text   items-center justify-start    my-4 group flex gap-5  relative   "
            >
              {/*  <span className="hidden   lg:block scale-0 group-hover:scale-100 origin-center text-orange transition-transform duration-400">
                ·
              </span> */}
              <span className="block  link-item translate-y-20  ">
                {item.title}
              </span>
            </Link>
          ))}

          <div className="w-full h-0.25 bg-orange"></div>

          <ul 

          
          className="flex items-center justify-evenly w-full  mb-10">
            {[
              { title: "Instagram", href: "https://instagram.com/by.xruz" },

              {
                title: "LinkedIn",
                href: "https://www.linkedin.com/in/xruz-dev/",
              },
              { title: "info@byxruz.com", href: "mailto:info@byxruz.com" },
            ].map((item) => (
              <li key={item.title} className="my-4">
                <Link
                  href={item.href}
                  target="_blank"
                  className="text-base group group   flex gap-2 relative active:scale-95 transition-all duration-300 ease-in-out"
                >
                  {item.title}
                  <div className="w-full absolute lg:group-hover:scale-x-100 scale-x-0 origin-center duration-300 bottom-0 left-0 bg-foreground h-0.25"></div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div
        style={{
          opacity: openMenu ? 1 : 0,
          pointerEvents: openMenu ? "auto" : "none",
          transition: "opacity 1s ease-out",
        }}
        className="fixed top-0 left-0 w-screen h-screen z-550 backdrop-blur-[4px] opacity-0 grayscale  ease-out bg-background/10"
      ></div>
    </>
  );
};
