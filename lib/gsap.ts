"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/all";
import {InertiaPlugin} from "gsap/InertiaPlugin";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP , Draggable, InertiaPlugin);

CustomEase.create(
  "hop",
  "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1",
);

CustomEase.create("powercustom", "M0,0 C1.064,0 0.492,1 1,1 ");
CustomEase.create("custom", "M0,0 C0.075,0.229 0.057,0.2 0.2,0.2 0.29,0.2 0.276,0.201 0.365,0.202 0.694,0.202 0.818,1.001 1,1 ");

export { gsap, ScrollTrigger, SplitText, CustomEase, useGSAP, Draggable, InertiaPlugin };
