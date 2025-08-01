"use client";
import { useAnimationsStore } from "@/store";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { useRef } from "react";

const NotFound = () => {
  const { setCursorSize, setCanAnimate,canAnimate } = useAnimationsStore();
  const notFoundRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useGSAP(
    () => {
      if (!notFoundRef.current || !canAnimate) return;

      gsap.to(notFoundRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    {
      scope: notFoundRef,
      dependencies: [canAnimate], 
    }
  );


  return (
    <section
      ref={notFoundRef}
      className="flex flex-col h-screen items-center justify-center bg-background opacity-0 "
    >
      <div className="text-center z-501 ">
        <h1 className="text-9xl  md:text-[11rem] text-orange font-bold text-primary">
          404
        </h1>
        <p className="mt-4 text-xl md:text-2xl">Págna no encontrada.</p>
      </div>

      <Link
        href={"/"}
        target="_blank"
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
              router.push("/");
            });
        }}
        className="text-orange mt-5 relative xl:mt-10 text-sm border px-6 xl:px-10 py-2 xl:py-4 rounded-[45px] active:scale-95 transition-all duration-500 ease-in hover:scale-105  hover:text-background"
        onMouseEnter={() => {
          setCursorSize(0);
          const overlay = notFoundRef.current?.querySelector(
            `.overlay-notfound`
          ) as HTMLDivElement;

          if (overlay) {
            overlay.style.clipPath = "circle(100% at 50% 50%)";
          }
        }}
        onMouseLeave={() => {
          setCursorSize(20);

          const overlay = notFoundRef.current?.querySelector(
            `.overlay-notfound`
          ) as HTMLDivElement;

          if (overlay) {
            overlay.style.clipPath = "circle(0% at 50% 50%)";
          }
        }}
      >
        <span className="z-10 md:text-base lg:text-sm">Volver al inicio</span>
        <div
          style={{
            clipPath: "circle(0% at 50% 50%)",
            transition: "clip-path 0.5s ease-in-out, opacity 0.5s ease-in-out",
          }}
          className={
            "btn-layer size-full bg-orange absolute top-1/2 left-1/2 -translate-1/2 -translate-x-1/2 -z-20 rounded-[45px] " +
            `overlay-notfound`
          }
        />
      </Link>
    </section>
  );
};

export default NotFound;
