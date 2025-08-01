"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAnimationsStore } from "@/store";

export const ContactPageClient = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [time, setTime] = useState<string>("");

  const [status, setStatus] = useState<string>("Enviar mensaje");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
      client: "byxruz",
    };

    try {
      const res = await fetch("http://localhost:3030/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: data.name,
          email: data.email,
          mensaje: data.message,
          cliente: data.client,
        }),
      });

      if (res.ok) {
        setStatus("Mensaje enviado");
        form.reset();
      } else {
        setStatus("Error al enviar el mensaje");
      }
    } catch {
      setStatus("Error al enviar el mensaje");
    } finally {
      setTimeout(() => {
        setStatus("Enviar mensaje");
      }, 3000);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("es-AR", {
          timeZone: "America/Argentina/Buenos_Aires",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { setCursorSize, canAnimate } = useAnimationsStore();

  useGSAP(
    () => {
      if (!contactRef.current) return;
      const $formItems = Array.from(
        contactRef.current.querySelectorAll("form > div, form > button")
      ) as HTMLElement[];

      const $h1$p = Array.from(
        contactRef.current.querySelectorAll("h1, p")
      ) as HTMLElement[];

      const $infoContainer = contactRef.current.querySelector(
        ".info-container"
      ) as HTMLElement;

      tlRef.current = gsap
        .timeline({ paused: true })
        .to([...$h1$p, ...$formItems], {
          x: "0",
          duration: 2,
          stagger: 0.2,
          ease: "power4.out",
        })
        .to(
          $infoContainer,
          {
            x: "0",
            duration: 2,
            stagger: 0.2,
            ease: "power4.out",
          },
          "<"
        );
    },
    {
      scope: contactRef,
    }
  );

  useEffect(() => {
    if (!tlRef.current) return;
    if (canAnimate) {
      tlRef.current.play();
    } else {
      tlRef.current?.reverse();
    }
  }, [canAnimate]);

  return (
    <section
      ref={contactRef}
      className="flex flex-col items-start justify-start min-h-screen pt-28 px-6 md:px-26 relative z-500 overflow-x-hidden"
    >
      <h1 className="text-6xl uppercase md:text-8xl 2xl:text-9xl font-bold -translate-x-[120%]">
        Hablemos<span className="text-orange">.</span>
      </h1>
      <p className="text-lg md:text-xl mb-10 -translate-x-100">
        Gracias por tu interés.
      </p>

      <div className="flex flex-col lg:flex-row w-full mb-20 items-start lg:justify-between">
        <form
          onMouseEnter={() => setCursorSize(0)}
          onMouseLeave={() => setCursorSize(20)}
          onSubmit={handleSubmit}
          className="w-full lg:w-2/3 flex flex-col font-text items-center justify-center h-auto"
        >
          <div className="w-full flex items-start   justify-start border-t mt-6 py-10 -translate-x-[150%] ">
            <span className="text-orange">01</span>

            <label className="flex flex-col w-full uppercase   font-bold ml-4">
              ¿Cuál es tu nombre?
              <input
                type="text"
                name="name"
                autoComplete="name"
                className=" py-4 pl-4  outline-none  focus:outline-none"
                placeholder="Tu nombre"
                required
              />
            </label>
          </div>

          <div className="w-full flex items-start justify-start border-t py-10 -translate-x-[150%] ">
            <span className="text-orange">02</span>
            <label className="flex flex-col w-full uppercase font-bold ml-4">
              ¿Cuál es tu email?
              <input
                type="email"
                name="email"
                autoComplete="email"
                className="py-4 pl-4 outline-none focus:outline-none"
                placeholder="Tu email"
                required
              />
            </label>
          </div>

          <div className="w-full flex items-start justify-start border-y py-10 -translate-x-[150%] ">
            <span className="text-orange">03</span>
            <label className="flex flex-col w-full uppercase font-bold ml-4">
              ¿Cuál es tu mensaje?
              <textarea
                className="py-4 pl-4 outline-none focus:outline-none resize-none"
                placeholder="Tu mensaje"
                required
                name="message"
                rows={5}
              />
            </label>
          </div>

          <button
            onMouseEnter={() => setCursorSize(0)}
            onMouseLeave={() => setCursorSize(20)}
            type="submit"
            disabled={status === "loading"}
            style={{
              width: status === "loading" ? "10rem" : "9rem",
              transition: "width 0.3s ease, background-color 0.3s ease",
              backgroundColor:
                status === "loading"
                  ? "#4e4e4e"
                  : status === "Mensaje enviado"
                  ? "#28a745"
                  : status === "Error al enviar el mensaje"
                  ? "#dc3545"
                  : "var(--orange)",
            }}
            className="mt-10 cursor-pointer px-6 py-3 bg-orange text-background font-bold  flex items-center justify-center   uppercase rounded-lg lg:hover:bg-orange/80    -translate-x-200"
          >
            {status}{" "}
            {status === "loading" && (
              <svg
                className="inline w-5 h-5 animate-spin ml-2 text-background"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
          </button>
        </form>

        <div className="w-full lg:w-1/3 xl:w-1/4 flex flex-col items-start justify-center h-auto mt-10 lg:mt-0 lg:ml-10 info-container translate-x-[150%]">
          <h2 className="text-2xl font-bold mb-4">Información de contacto</h2>
          <Link href="mailto:info@byxruz.com" className="text-lg mb-2">
            info@byxruz.com
          </Link>
          <p className="text-lg mb-2">Ubicación: Bahía Blanca, Argentina.</p>

          <h2 className="text-2xl font-bold mt-10 ">
            Zona Horaria <span className="text-orange">GMT-3 </span>
          </h2>

          <p className="text-lg mt-2">{time}</p>
        </div>
      </div>
    </section>
  );
};
