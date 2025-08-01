"use client";
import Link from "next/link";
import React from "react";
import { useAnimationsStore } from "@/store";

export const Footer = () => {
  const { setCursorSize } = useAnimationsStore();

  return (
    <footer className="flex  items-center text-center flex-col gap-5 md:gap-8 lg:gap-0 lg:flex-row justify-between w-screen relative pb-10 z-5000 px-4 md:px-10 lg:px-6 xl:px-20">
      <span className=" w-fit">
        ByXruz  © v1.0.0   <span className="hidden md:inline">|</span> 
        <br className="md:hidden" /> Diseñado y desarrollado en el año {new Date().getFullYear()} por Juan Cruz Elias
      </span>

      <ul className="flex  justify-between">
        {[
          { name: "LinkedIn", href: "https://www.linkedin.com/" },
          { name: "GitHub", href: "https://www.linkedin.com/in/xruz-dev/" },
          { name: "Instagram", href: "https://www.instagram.com/by.xruz/" },
          {
            name: "Email",
            href: "mailto:info@byxruz.com",
          },
        ].map((item, index) => (
          <li
            key={index}
            className="inline-block mx-2 underline-offset-5 underline"
          >
            <Link
              onMouseEnter={() => setCursorSize(60)}
              onMouseLeave={() => setCursorSize(20)}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};
