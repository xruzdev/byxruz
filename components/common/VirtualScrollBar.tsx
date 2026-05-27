"use client";

import { useAppStore } from "@/lib/app-store";
import { useLenis } from "lenis/react";
import {
  useCallback,
  useEffect, 
  useRef,
  useState,
} from "react";

type Props = {
  thumbHeight: number;
  thumbColor: string;
};

export function VirtualScrollBar({ thumbHeight, thumbColor }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dragStartYRef = useRef(0);
  const dragStartScrollRef = useRef(0);

  const { isLenisStopped } = useAppStore();

  const [limit, setLimit] = useState(0);

  const lenis = useLenis(({ scroll, limit }) => {
    setScrollTop(scroll);
    if (limit !== undefined) {
      setLimit(limit);
    }
  });

  const scrollPercentage = limit > 0 ? scrollTop / limit : 0;
 
  // Si el límite de Lenis es mayor a 0, significa que la página es scrolleable
  const hasScroll = limit > 0;

  // ✅ useEffect para window operations
  useEffect(() => {
    const updateScrollHeight = () => {
      setScrollHeight(window.innerHeight);

      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0,
      );
    };

    updateScrollHeight();

    window.addEventListener("resize", updateScrollHeight);

    return () => {
      window.removeEventListener("resize", updateScrollHeight);
    };
  }, [setIsTouchDevice]);

  // ✅ useEffect para drag handlers
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - dragStartYRef.current;
      const maxScroll = scrollHeight - thumbHeight;
      if (maxScroll <= 0) return;

      const scrollRatio = deltaY / maxScroll;

      lenis?.scrollTo(
        dragStartScrollRef.current + scrollRatio * (lenis.limit || 0),
      );

      
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, scrollHeight, thumbHeight, lenis]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
      dragStartYRef.current = e.clientY;
      dragStartScrollRef.current = lenis?.scroll || 0;
    },
    [lenis],
  );

  // ✅ Calcular visibilidad: mostrar solo si hay scroll Y no hay animación/menú abierto
  const shouldShow = hasScroll && !isTouchDevice && !isLenisStopped;
 

  // Early return si no hay scroll disponible
  if (!hasScroll) return null;

  return (
    <div
      style={{
        opacity: shouldShow ? "1" : "0",
        pointerEvents: shouldShow ? "auto" : "none",
        transition: "opacity 0.3s ease-out",
      }}
      className="hidden lg:block fixed z-700 top-0 right-0 w-1.5 mr-1 h-full"
    >
      <div
        onMouseDown={handleMouseDown}
        style={{
          transform: `translateY(${
            scrollPercentage * (scrollHeight - thumbHeight)
          }px)`,
          height: `${thumbHeight}px`,
          backgroundColor: thumbColor,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        className="absolute top-0 right-0 w-1.5 mx-auto rounded-lg transition-all ease-out duration-300  "
      />
    </div>
  );
}
