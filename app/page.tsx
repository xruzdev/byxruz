import { About } from "@/components/pages/home/about/About";
import { Contact } from "@/components/pages/home/contact/Contact";
import { FeaturedWork } from "@/components/pages/home/featured-work/FeaturedWork";
import { Hero } from "@/components/pages/home/hero/Hero";
import { MarqueeBg } from "@/components/pages/home/MarqueeBg";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedWork />
      <MarqueeBg />
      <Contact />
    </>
  );
}
