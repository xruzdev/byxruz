"use client";

import { useAnimationsStore } from "@/store";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { Menu } from "./Menu";

export const Nav = () => {
  const navRef = useRef<HTMLDivElement>(null);

  const tweenMainRef = useRef<gsap.core.Tween | null>(null);

  const { push } = useRouter();
  const { setCanAnimate, canAnimate, setCursorSize } = useAnimationsStore();

  useEffect(() => {
    tweenMainRef.current = gsap.to("main", {
      opacity: 0,
      duration: 0.5,
      paused: true,
      ease: "power2.inOut",
    });
  }, []);

  useGSAP(
    () => {
      if (!navRef.current) return;

      if (canAnimate) {
        gsap.to([navRef.current, "#menu"], {
          opacity: 1,
          duration: 0.5,
        });
      } else {
        gsap.from([navRef.current, "#menu"], {
          opacity: 0,
          duration: 0.5,
        });
      }
    },
    {
      dependencies: [canAnimate],
      revertOnUpdate: true,
    }
  );

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 px-6 md:px-10 lg:px-6 xl:px-10 opacity-0    w-fit pt-6 md:pt-10 lg:pt-6 xl:pt-10 z-501  flex items-start justify-start "
      >
        <Link
          onMouseEnter={() => {
            setCursorSize(0);
          }}
          onMouseLeave={() => {
            setCursorSize(20);
          }}
          onClick={(e) => {
            e.preventDefault();
            if (window.location.pathname === "/") return;
            tweenMainRef.current!.play().then(() => {
              setCanAnimate(false);
              push("/");
            });
          }}
          href="/"
          className="size-15   relative lg:hover:scale-105 active:scale-95 transition-transform duration-300 ease-in-out"
        >
          <Image
            fill
            src="/xruz-logo-2.png"
            alt="logo"
            className="object-contain active:scale-95 duration-300 "
          />
        </Link>
      </nav>
      <Menu />
    </>
  );
};
