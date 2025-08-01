"use client";

import { useAnimationsStore } from "@/store";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { LenisContext } from "../providers/LenisProvider";

export function VirtualScrollBar() {
  const { scrollPercentage, velocity, lenisRef } = useContext(LenisContext);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const scrollbarThumbRef = useRef<HTMLDivElement>(null);
  const scrollBarContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const { isTouchDevice, canScroll } = useAnimationsStore();

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setScrollTop(lenisRef.current?.lenis?.scroll || 0);
  };

  useEffect(() => {
    document.body.style.overflow = isTouchDevice ? "auto" : "hidden";
  }, [isTouchDevice]);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaY = e.clientY - startY;
      lenisRef.current?.lenis?.scrollTo(scrollTop + deltaY * 10);
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startY, scrollTop, isTouchDevice, lenisRef]);

  useEffect(() => {
    const el = scrollbarThumbRef.current;
    if (!el || isTouchDevice) return;

    el.style.opacity = velocity === 0 ? "0.1" : "0.6";
    el.style.cursor = isDragging ? "grabbing" : "grab";
  }, [velocity, isDragging, isTouchDevice]);

  useEffect(() => {
    const el = scrollbarThumbRef.current;
    if (!el || isTouchDevice) return;

    if (document.body.scrollHeight <= window.innerHeight) {
      el.style.display = "none";
    } else {
      el.style.display = "block";
    }
  }, [pathname, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={scrollBarContainerRef}
      style={{
        opacity: canScroll ? "1" : "0",
        transition: "opacity 0.3s ease-out",
      }}
      className="hidden lg:block fixed z-[9999] top-0 right-0 w-10 mr-1 h-full bg-transparent"
    >
      <div
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => {
          if (!isDragging) e.currentTarget.style.opacity = "0.1";
        }}
        onMouseDown={handleMouseDown}
        ref={scrollbarThumbRef}
        style={{
          transform: `translateY(${scrollPercentage * 1900}%)`,
        }}
        className="absolute top-0 right-0 w-1.5 mx-auto h-[5%] bg-orange rounded-lg active:scale-y-95 transition-all opacity-0 ease-out duration-300"
      ></div>
    </div>
  );
}
