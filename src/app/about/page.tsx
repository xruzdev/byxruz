/* eslint-disable @next/next/no-img-element */
import { AboutPageClient } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quien Soy ",
  description: "Conoce más sobre mi",
};

export default function AboutPage() {
  return (
    <>
      <AboutPageClient />
    </>
  );
}
