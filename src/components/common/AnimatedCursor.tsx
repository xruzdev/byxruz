"use client";
import React, { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { useAnimationsStore } from "@/store";
const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

export default function Cursor() {
  const mouse = useRef({ x: 0, y: 0 });
  const circle = useRef<HTMLDivElement>(null);
  const delayedMouse = useRef({ x: 0, y: 0 });
  const rafId = useRef(0);
   

   

  const { cursorColor, cursorSize, cursorText,isTouchDevice,isPreloading,isTransitioning } = useAnimationsStore();



  const animate = useCallback(() => {
    const { x, y } = delayedMouse.current;

    delayedMouse.current = {
      x: lerp(x, mouse.current.x, 0.075),
      y: lerp(y, mouse.current.y, 0.075),
    };

    moveCircle(delayedMouse.current.x, delayedMouse.current.y);

    rafId.current = window.requestAnimationFrame(animate);
  }, []);



  const manageMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;

    mouse.current = {
      x: clientX,
      y: clientY,
    };

    moveCircle(mouse.current.x, mouse.current.y);
  }, []);



  useEffect(() => {
    if (isTouchDevice) return;

    animate();

    window.addEventListener("mousemove", manageMouseMove);

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);

      window.cancelAnimationFrame(rafId.current);
    };
  }, [animate, manageMouseMove, isTouchDevice]);

  const moveCircle = (x: number, y: number) => {
    if (!circle.current) return;

    gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 });
  };

  

  useEffect(() => {
    if (isTouchDevice) return;

    window.addEventListener("mousemove", manageMouseMove);

    document.addEventListener("mouseleave", () => {
      if (!circle.current) return;

      circle.current.style.opacity = "0";
    });

    document.addEventListener("mouseenter", () => {
      if (!circle.current) return;

      circle.current.style.opacity = "1";
    });
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, [manageMouseMove, isTouchDevice]);

  
  return (
    <div
      style={{
        width: cursorSize,
        height: cursorSize,
        display: isTouchDevice || isPreloading || isTransitioning ? "none" : "flex",
        backgroundColor: cursorColor,
        transition:
          "width 0.7s, height 0.7s, background-color 0.7s, opacity 0.7s",
      }}
      
      ref={circle}
      className={
        "top-0 left-0 z-500  items-center justify-center text-background font-semibold text-lg  fixed rounded-full pointer-events-none " 
      }
    >
      {cursorText !== "" && (
        <span className="animate-fade-in">{cursorText}</span>
      )}
    </div>
  );
}
