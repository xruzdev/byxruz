"use client";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { Children, useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  triggerAnimation?: boolean;
  start?: string;
};

export default function Copy({
  children,
  animateOnScroll = true,
  delay = 0,
  triggerAnimation = false,
  start = "top 80%",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null),
    elementRef = useRef<HTMLElement[]>([]),
    splitRef = useRef<SplitText[]>([]),
    lines = useRef<Element[]>([]),
    tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      splitRef.current = [];
      elementRef.current = [];
      lines.current = [];

      let elements = [];

      if (containerRef.current.hasAttribute("data-copy-wrapper")) {
        elements = Array.from(containerRef.current.children);
      } else {
        elements = [containerRef.current];
      }

      elements.forEach((element) => {
        elementRef.current.push(element as HTMLElement);

        element.setAttribute("role", "group");

        const split = SplitText.create(element, {
          type: "lines",
          mask: "lines",
          linesClass: "line++",
        });

        splitRef.current.push(split);

        const computedStyle = window.getComputedStyle(element),
          textIndent = computedStyle.textIndent;

        if (textIndent && textIndent !== "0px") {
          if (split.lines.length > 0) {
            gsap.set(split.lines[0], { paddingLeft: textIndent });
          }

          gsap.set(element, { textIndent: 0 });
        }

        lines.current.push(...split.lines);
      });
      gsap.set(lines.current, { yPercent: 100 });

      const animationProps: gsap.TweenVars = {
        yPercent: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: delay,
        
      };

      if (animateOnScroll) {
        // Modo: animar con scroll
        tweenRef.current = gsap.to(lines.current, {
          ...animationProps,

          scrollTrigger: {
            trigger: containerRef.current,
            start,
            //once: true,
            toggleActions: "play none none reverse",
          },
        });
      } else {
        // Modo: animar manualmente con triggerAnimation
        tweenRef.current = gsap.to(lines.current, {
          ...animationProps,
          paused: true, // Siempre pausado hasta que triggerAnimation sea true
        });
      }

      return () => {
        splitRef.current.forEach((split) => split.revert());

        elementRef.current = [];
        splitRef.current = [];
        lines.current = [];
      };
    },
    {
      scope: containerRef,
    },
  );

  useEffect(() => {
    if (animateOnScroll) return; // No hacer nada si la animación es por scroll
    if (triggerAnimation) {
      tweenRef.current?.play();
    } else {
      tweenRef.current?.reverse();
    }
  }, [triggerAnimation, animateOnScroll]);

  /*   if (Children.count(children) === 1) {
    return cloneElement(Children.only(children) as React.ReactElement, {
      ref: containerRef,
    });
  } */

  return (
    <div
      ref={containerRef}
      data-copy-wrapper={Children.count(children) > 1 ? "true" : undefined}
    >
      {children}
    </div>
  );
}
