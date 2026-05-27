"use client";

import Link, { LinkProps } from "next/link";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

interface LenisLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  style?: React.CSSProperties;
}

export const LenisLink: React.FC<LenisLinkProps> = ({ children, ...props }) => {
  const lenis = useLenis();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = props.href as string;

    // Caso 1: href="#section" (anchor en la misma página)
    if (href?.startsWith("#")) {
      e.preventDefault();
      if (!lenis) return;

      lenis.scrollTo(href, {
        offset: -100,
        duration: 1.5,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
      return;
    }

    // Caso 2: href="/ruta#section" (ruta + anchor)
    if (href?.includes("#")) {
      const [route, hash] = href.split("#");
      
      // Si la ruta coincide con la actual, solo hacer scroll
      if (route === pathname) {
        e.preventDefault();
        if (!lenis) return;

        lenis.scrollTo(`#${hash}`, {
          offset: -100,
          duration: 1.5,
          easing: (t) => 1 - Math.pow(1 - t, 4),
        });
        return;
      }
      // Si la ruta es diferente, deja que Next.js navegue normalmente
    }

    // Caso 3: href="/ruta" o hrefs externos - comportamiento normal de Link
  };

  return (
    <Link {...props} className={props.className} style={props.style} title={props.title} onClick={handleClick}>
      {children}
    </Link>
  );
};