"use client";

import dynamic from "next/dynamic";

export const GrainyBackground = dynamic(() => import("./GrainyBackgroundClient"), {
  ssr: false,
});

 