 
import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/components";
 

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
        url: "https://byxruz.com/og-image.png",
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
    <html lang="es">
      <body
        style={{
          overflow: "hidden",
        }} 
      >
        <AppProvider>
          
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
