import { TransitionWrapper } from "@/components/wrappers/TransitionWrapper";
import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/common/nav/Nav";
import { Footer } from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "byxruz • Juan Cruz Elias",
  description:
    "Creo sitios y sistemas web con un enfoque moderno, visual y altamente funcional. Ayudo a agencias, marcas y emprendedores que buscan destacar en digital.",
  openGraph: {
    title: "byxruz • Juan Cruz Elias",
    description:
      "Creo sitios y sistemas web con un enfoque moderno, visual y altamente funcional. Ayudo a agencias, marcas y emprendedores que buscan destacar en digital.",
    url: "https://byxruz.com",
    siteName: "byxruz • Juan Cruz Elias",
    images: [
      {
        url: "https://byxruz.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "byxruz • Juan Cruz Elias",
      },
    ],
    locale: "es-AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`  antialiased overflow-x-hidden lg:overflow-y-hidden`}
    >
      <body className="   flex flex-col">
        <TransitionWrapper>
          <Nav />

          {children}
           <Footer />
        </TransitionWrapper>
      </body>
    </html>
  );
}
