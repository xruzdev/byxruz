import React from "react";
import "./style.css";
export const Marquee = ({
  text,
  direction,
  className,
}: {
  text: string;
  direction: "left" | "right";
  className?: string;
}) => {
  return (
    <div
      className={`marquee ${className}`}
      style={
        {
          clipPath: "polygon(0% 100%, 100% 0%, 100% 0%, 0% 100%)",
          "--char--count": text.length,
          "--marquee--direction": direction == "left" ? -1 : 1,
        } as React.CSSProperties
      }
    >
      <div className="marquee--inner">
        <p>{text}</p>
        <p aria-hidden="true">{text}</p>
        <p aria-hidden="true">{text}</p>
        <p aria-hidden="true">{text}</p>
        <p aria-hidden="true">{text}</p>
        <p aria-hidden="true">{text}</p>
        <p aria-hidden="true">{text}</p>
        <p aria-hidden="true">{text}</p>
        <p aria-hidden="true">{text}</p>
        <p aria-hidden="true">{text}</p>
        <p aria-hidden="true">{text}</p>
        <p aria-hidden="true">{text}</p>
        <p aria-hidden="true">{text}</p>
        <p aria-hidden="true">{text}</p>
        <p aria-hidden="true">{text}</p>
        <p aria-hidden="true">{text}</p>
      </div>
    </div>
  );
};
/*  */
