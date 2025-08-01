 
import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/components";
 

export const metadata: Metadata = {
  title: "byxruz • Juan Cruz Elias",
  description:
    "Creo sitios y sistemas web con un enfoque moderno, visual y altamente funcional. Ayudo a agencias, marcas y emprendedores que buscan destacar en digital.",
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
