"use client";

import { useAppStore } from "@/lib/app-store";
import { gsap, useGSAP } from "@/lib/gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

import { Menu } from "./Menu";

export const Nav = () => {
  const [showDesktopMenu, setShowDesktopMenu] = useState(false);

  const desktopLinksRef = useRef<HTMLDivElement>(null);
  const desktopMenuRef = useRef<HTMLDivElement>(null);

  const lenis = useLenis();
  const { setCursorSize } = useAppStore();

  useGSAP(
    () => {
      const linksEl = desktopLinksRef.current;
      const menuEl = desktopMenuRef.current;

      if (linksEl) {
        gsap.set(linksEl, {
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
        });
      }

      if (menuEl) {
        gsap.set(menuEl, {
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
          opacity: 0,
          y: -8,
          scale: 0.98,
          filter: "blur(8px)",
          pointerEvents: "none",
        });
      }
    },
    { scope: desktopLinksRef },
  );

  useEffect(() => {
    const linksEl = desktopLinksRef.current;
    const menuEl = desktopMenuRef.current;

    if (!linksEl || !menuEl) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.35 } });

    if (showDesktopMenu) {
      tl.to(linksEl, {
        opacity: 0,
        y: -8,
        rotateX: 35,
        filter: "blur(8px)",
        pointerEvents: "none",
      }).to(
        menuEl,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          pointerEvents: "auto",
        },
        "<0.05",
      );
    } else {
      tl.to(menuEl, {
        opacity: 0,
        y: -8,
        scale: 0.98,
        filter: "blur(8px)",
        pointerEvents: "none",
      }).to(
        linksEl,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          pointerEvents: "auto",
        },
        "<0.05",
      );
    }

    return () => {
      tl.kill();
    };
  }, [showDesktopMenu]);

  const handleLinkHover = (linkEl: HTMLAnchorElement, isEnter: boolean) => {
    const words = linkEl.querySelectorAll<HTMLElement>("[data-link-word]");
    const outgoing = words[0];
    const incoming = words[1];

    if (!outgoing || !incoming) return;

    const timeline = gsap.timeline({ defaults: { duration: 0.45, ease: "power3.out" } });

    if (isEnter) {
      timeline
        .set(incoming, {
          rotationX: 88,
          y: 14,
          opacity: 0,
          filter: "blur(8px)",
        })
        .to(outgoing, {
          rotationX: -88,
          y: -14,
          opacity: 0,
          filter: "blur(8px)",
        })
        .to(
          incoming,
          {
            rotationX: 0,
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
          },
          "<0.05",
        );
      return;
    }

    timeline
      .to(outgoing, {
        rotationX: 0,
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
      })
      .to(
        incoming,
        {
          rotationX: 88,
          y: 14,
          opacity: 0,
          filter: "blur(8px)",
        },
        "<0.05",
      );
  };

  useEffect(() => {
    if (!lenis) return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const threshold = 40;

    const syncDesktopNav = (scrollValue: number) => {
      if (!mediaQuery.matches) {
        setShowDesktopMenu(false);
        return;
      }

      setShowDesktopMenu(scrollValue > threshold);
    };

    const handleScroll = (event: { scroll?: number }) => {
      syncDesktopNav(event.scroll ?? lenis.scroll ?? 0);
    };

    const handleMediaChange = () => {
      syncDesktopNav(lenis.scroll ?? 0);
    };

    syncDesktopNav(lenis.scroll ?? 0);

    lenis.on("scroll", handleScroll);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      lenis.off("scroll", handleScroll);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, [lenis]);

  const desktopLinks = [
    { title: "Home", href: "/" },
    { title: "Trabajo", href: "/work" },
    { title: "About", href: "/about" },
    { title: "Contacto", href: "/contact" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 px-6 md:px-10 lg:px-6 xl:px-10 w-full pt-6 md:pt-10 lg:pt-6 xl:pt-10 z-501 flex items-start justify-between"
      >
        <Link
          onMouseEnter={() => {
            setCursorSize(0);
          }}
          onMouseLeave={() => {
            setCursorSize(20);
          }}
           
          href="/"
          className="size-15  relative lg:hover:scale-105 active:scale-95 transition-transform duration-300 ease-in-out"
        >
          <Image
            fill
            src="/xruz-logo-2.png"
            alt="logo"
            sizes="(max-width: 768px) 24px, (max-width: 1024px) 36px, 40px"
            loading="eager"
            className="object-contain active:scale-95 duration-300 "
          />
        </Link>

        <div
          ref={desktopLinksRef}
          className={
            "hidden lg:flex items-center gap-8 xl:gap-10 ml-8 xl:ml-10 pt-2 lg:will-change-transform "
          }
        >
          {desktopLinks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              onMouseEnter={(event) => {
                setCursorSize(0);
                handleLinkHover(event.currentTarget, true);
              }}
              onMouseLeave={(event) => {
                setCursorSize(20);
                handleLinkHover(event.currentTarget, false);
              }}
              className="text-sm xl:text-lg uppercase font-bold text-foreground transition-colors duration-300 perspective-distant"
            >
              <span className="relative inline-block overflow-hidden transform-3d perspective-distant">
                <span
                  data-link-word
                  className="inline-block origin-center transform-3d"
                >
                  {item.title}
                </span>
                <span
                  data-link-word
                  className="pointer-events-none absolute left-0 top-0 inline-block origin-center opacity-0 transform-3d transform-[rotateX(88deg)_translateY(14px)]"
                  aria-hidden="true"
                >
                  {item.title}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </nav>
      <Menu desktopVisible={showDesktopMenu} desktopMenuRef={desktopMenuRef} />
    </>
  );
};
