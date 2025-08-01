import { ContactPageClient } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Página de contacto de ByXruz",
};

export default function ContactPage() {
  return (
    <>
      <ContactPageClient />
    </>
  );
}
