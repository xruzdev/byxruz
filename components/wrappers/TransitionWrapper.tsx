"use client";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Lenis } from "./Lenis";
import {Parallax} from  "./Parallax";
import { VirtualScrollBar } from "../common/VirtualScrollBar";
import { useLenis } from "lenis/react";
// Importa tu store si lo usas, aquí asumo la estructura de tu snippet

export const TransitionWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Reemplaza esto con tu store si quieres mantener el estado global
  const [isTransitioning, setIsTransitioning] = useState(false);

  const lenis = useLenis();

  const slideInOut = useCallback(() => {
   // Animación del contenido viejo (sale)
    document.documentElement.animate(
      [
        {
          filter: "blur(0px)",
          transform: "translateX(0)",
        },
        {
          filter: "blur(5px)",
          transform: "translateX(-35%)",
        },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      }
    );

    // Animación del contenido nuevo (entra)
    document.documentElement.animate(
      [
        {
          filter: "blur(5px)",
          clipPath: "polygon(100% 100%, 100% 100%, 100% 0%, 100% 0%)",
        },
        {
          filter: "blur(0px)",
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, []);

  const handleRouteChange = useCallback(
    async (url: string) => {
      setIsTransitioning(true);

      if (!document.startViewTransition) {
        lenis?.scrollTo(0, { immediate: true });
        router.push(url);
        setIsTransitioning(false);
        return;
      }
      
      const transition = document.startViewTransition(async () => {
        router.push(url);
        lenis?.scrollTo(0, { immediate: true });
        // Pequeño retardo para que Next.js actualice el DOM
        await new Promise((resolve) => setTimeout(resolve, 50));
      });

      transition.ready.then(() => {
        slideInOut();
      });

      transition.finished.finally(() => {
        setIsTransitioning(false);
      });
    },
    [router, slideInOut, lenis],
  );

  const onAnchorClick = useCallback(
    (e: MouseEvent) => {
      // Buscar si el click provino de una etiqueta <a> o alguien dentro de ella (ej. un svg, o un span)
      const target = (e.target as HTMLElement).closest("a");

      // Si no hay un enlace clickeado, no hacemos nada
      if (!target || !target.href) return;

      // Links como los del menú gestionan su propio flujo: cerrar primero y luego navegar.
      if (target.dataset.closeMenuFirst === "true") {
        e.preventDefault();
        return;
      }

      if (isTransitioning) {
        e.preventDefault();
        return;
      }

      // Verificamos teclas especiales para no bloquear comportamiento nativo de abrir pestañas
      if (
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0 ||
        target.target === "_blank"
      ) {
        return;
      }

      // Evitamos interceptar links externos
      const isExternal = new URL(target.href, window.location.href).origin !== window.location.origin;
      if (isExternal) return;

      const urlObj = new URL(target.href);
      const targetPathname = urlObj.pathname;
      const targetDestination = urlObj.pathname + urlObj.search + urlObj.hash;

      // Navegación en la misma página (anchor hash)
      if (targetPathname === pathname) {
        return;
      }

      // Todo es correcto: Prevenimos y hacemos nuestra transición
      e.preventDefault();
      handleRouteChange(targetDestination);
    },
    [pathname, handleRouteChange, isTransitioning],
  );

  const onMenuNavigate = useCallback(
    (event: Event) => {
      const customEvent = event as CustomEvent<{ href?: string }>;
      const href = customEvent.detail?.href;

      if (!href || isTransitioning) return;
      void handleRouteChange(href);
    },
    [handleRouteChange, isTransitioning],
  );

   useEffect(() => {
    // Al atar el click al document, nos aseguramos de atrapar los links
    // sin importar cuándo se hayan renderizado en el DOM
    document.addEventListener("click", onAnchorClick);
    window.addEventListener("menu:navigate", onMenuNavigate as EventListener);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener(
        "menu:navigate",
        onMenuNavigate as EventListener,
      );
    };
  }, [onAnchorClick, onMenuNavigate]);

  return (
      <Lenis>
    <div ref={contentRef} className="relative ">
        <VirtualScrollBar thumbHeight={50} thumbColor="var(--main)" />
        <Parallax>{children}</Parallax>
    </div>
      </Lenis>
  );
};
