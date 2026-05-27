 
import { AboutPageClient } from "@/components/pages/about/AboutPage";
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
