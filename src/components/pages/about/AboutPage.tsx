/* eslint-disable @next/next/no-img-element */
"use client";
import { useAnimationsStore } from "@/store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { useRef } from "react";

export const AboutPageClient = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const { canAnimate, setCursorSize, setCanAnimate } = useAnimationsStore();

  const { push } = useRouter();
  useGSAP(() => {
    if (!aboutRef.current || !canAnimate) return;

    gsap
      .timeline()
      .to(".header", {
        y: 0,
        duration: 1.5,

        ease: "power4.out",
      })
      .to(".panel", {
        x: 0,
        duration: 1.5,
        delay: -0.5,
        ease: "power4.out",
      })
      .to(
        "h1",
        {
          y: 0,

          duration: 1.5,
          delay: -0.5,
          ease: "power4.out",
        },
        "<"
      );
  }, [canAnimate]);

  return (
    <section
      ref={aboutRef}
      className=" h-auto min-h-screen  py-25 md:py-30 flex flex-col gap-10 lg:gap-20 xl:gap-30 items-center justify-start  px-6 md:px-10 lg:px-26  z-500 "
    >
      <div className=" header w-full border-b border-orange z-501 -translate-y-60 lg:-translate-y-100  overflow-hidden">
        <h1
          data-scroll-horizontal
          data-scroll-speed="0.9"
          className="text-[2.75rem] sm:text-5xl md:text-6xl uppercase lg:text-8xl 2xl:text-[12rem] font-bold translate-y-full     sm:mb-4"
        >
          Juan Cruz Elias <span className="text-orange">.</span>
        </h1>
      </div>

      <div className="  w-full h-auto lg:h-[120vh]  2xl:h-[110vh]  flex flex-col-reverse lg:flex-row items-center justify-between">
        <div className="panel w-full lg:w-2/5 h-auto  lg:h-full   about-text text-center lg:text-start z-501 -translate-x-[140%]">
          <h2 className="text-3xl !font-text mt-10 lg:mt-0 md:text-3xl xl:text-5xl 2xl:text-6xl font-semibold  mb-5">
            ¿Quien soy?
          </h2>

          <p className="text-lg md:text-xl lg:text-base xl:text-xl  2xl:text-2xl mb-4 lg:ml-5 xl:ml-10">
            Soy un desarrollador web con más de 1 año de experiencia, especializado en
            crear sitios y sistemas web modernos, visuales y altamente
            funcionales.
          </p>
          <p className="text-lg md:text-xl lg:text-base  xl:text-xl 2xl:text-2xl mb-4 lg:ml-5 xl:ml-10">
            Ayudo a agencias, marcas y emprendedores a alcanzar sus objetivos
            digitales mediante soluciones personalizadas y efectivas.
          </p>
          <p className="text-lg md:text-xl lg:text-base  xl:text-xl 2xl:text-2xl mb-4 lg:ml-5 xl:ml-10">
            Mi enfoque se centra en la usabilidad, el rendimiento y la estética,
            asegurando que cada proyecto no solo cumpla con los estándares
            técnicos, sino que también ofrezca una experiencia excepcional al
            usuario.
          </p>

          <h2 className="text-3xl !font-text mt-10 lg:mt-0 md:text-3xl xl:text-5xl  2xl:text-6xl font-semibold  mb-5">
            Experiencia Laboral
          </h2>
          <p className="text-lg md:text-xl lg:text-base xl:text-xl 2xl:text-2xl mb-4 lg:ml-5 xl:ml-10">
            He estado trabajando en proyectos para{" "}
            <a
              className="border-b"
              target="_blank"
              href="https://www.linkedin.com/company/flex-mkt/"
            >
              Flex Mkt Agency
            </a>
            , donde he desarrollado sitios web y sistemas personalizados,
            optimizados para rendimiento y usabilidad. También trabajé para
            otros emprendimientos y marcas, donde apliqué mis habilidades en
            desarrollo y diseño.
          </p>
          <h2 className="text-3xl !font-text mt-10 lg:mt-0 md:text-3xl xl:text-5xl  2xl:text-6xl font-semibold  mb-5">
            ¿Dónde me encuentro?
          </h2>
          <p className="text-lg md:text-xl lg:text-base xl:text-xl 2xl:text-2xl mb-4 lg:ml-5 xl:ml-10">
            Actualmente vivo en Bahía Blanca, Argentina, pero estoy abierto a
            trabajar con clientes de todo el mundo.  
          </p>
        </div>
        <div className="panel w-full md:w-4/5 lg:w-1/2 h-120 md:h-220 lg:h-full  overflow-hidden relative -z-10 translate-x-[120%]">
          <img
            data-scroll
            data-scroll-speed="-1.8"
            src="/images/about-image.jpg"
            alt="About Me"
            className="w-full h-[120%] object-cover"
          />
        </div>
      </div>

      <div className=" w-full flex flex-col up">
        <h2 className=" text-4xl lg:text-6xl  !font-text z-10 mb-5">
          Te puedo ayudar con ...
        </h2>

        <div className="wrapper flex flex-col md:flex-row items-start justify-start xl:justify-evenly gap-10 mt-5 md:mt-15 ">
          {[
            {
              title: "Desarrollo",
              description:
                "Creación de sitios y sistemas web personalizados, optimizados para rendimiento y usabilidad.",
            },
            {
              title: "Diseño",
              description:
                "Diseño visual atractivo y funcional, adaptado a las necesidades del cliente y del usuario final.",
            },
            {
              title: "Mantenimiento",
              description:
                "Mantenimiento y actualización de sitios web para asegurar su correcto funcionamiento y seguridad.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="w-full md:w-1/3 xl:w-1/4 h-auto border-t pt-10 md:pt-15 border-orange  relative z-501"
            >
              <span className="absolute text-orange -top-10 left-0 hidden md:block text-sm">
                0{index + 1}
              </span>
              <h3 className="text-2xl md:text-3xl xl:text-4xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-lg md:text-xl 2xl:text-2xl">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className=" w-full flex flex-col mt-10 md:mt-0">
        <h2 className="text-4xl lg:text-6xl  !font-text z-10 mb-10 md:mb-5   pb-5">
          Tecnologías que manejo
        </h2>

        <div className="wrapper w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:px-10 gap-10 md:mt-5 md:pt-5 justify-items-center xl:gap-y-20">
          {[
            {
              type: "Desarrollo Fullstack",
              technologies: [
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Express.js",
                "Node.js",
              ],
            },
            {
              type: "Estilos y Animaciones",
              technologies: ["Tailwind CSS", "Sass", "GSAP", "Framer Motion"],
            },

            {
              type: "Diseño",
              technologies: ["Figma", "Adobe Photoshop", "Adobe Illustrator"],
            },
            {
              type: "Herramientas",
              technologies: ["Git", "GitHub", "VS Code", "Postman", "Docker"],
            },
            {
              type: "DBs",
              technologies: ["MongoDB", "MySQL", "PostgreSQL", "Prisma"],
            },
            {
              type: "DevOps",
              technologies: [
                "Cloudflare",
                "Vercel",
                "Netlify",
                "Render",
                "Railway",
              ],
            },
          ].map((item, index) => (
            <div key={index} className="w-full xl:w-3/4 h-auto z-501 ">
              <h3 className="text-2xl md:text-3xl xl:text-4xl font-semibold mb-2 xl:mb-6 pb-2 text-start  border-b border-orange ">
                {item.type}
              </h3>
              <ul className="list-disc pl-5">
                {item.technologies.map((tech, techIndex) => (
                  <li
                    key={techIndex}
                    className="text-lg md:text-xl 2xl:text-2xl"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className=" w-full flex flex-col items-start justify-center z-501 ">
        <div className="flex flex-col lg:flex-row justify-start items-start  w-full lg:justify-between lg:items-end">
          <h2 className=" overflow-hidden text-start   ">
            <span className="font-display   font-bold uppercase text-6xl md:text-8xl lg:text-8xl 2xl:text-9xl">
              Keep in touch
              <span className="text-orange">.</span>
            </span>
          </h2>

          <Link
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              setCursorSize(0);
              setCanAnimate(false);
              gsap
                .to("main", {
                  opacity: 0,
                  duration: 0.5,
                })
                .then(() => {
                  push("/contact");
                });
            }}
            className="cursor-pointer px-6 py-3 my-10 lg:my-0 lg:mb-4 bg-orange text-background text-sm font-bold  uppercase rounded-lg lg:hover:bg-orange/80 transition-colors duration-300  "
            onMouseEnter={() => {
              setCursorSize(0);
            }}
            onMouseLeave={() => {
              setCursorSize(20);
            }}
          >
            <span className="z-10">Contactame !</span>
          </Link>
        </div>

        <div className="line h-0.25 bg-orange w-full xl:mt-10 "></div>

        <p className="my-8">
          <span className="block text-lg">Email:</span>
          <span className=" block text-2xl text-orange">info@byxruz.com</span>
        </p>

        <div className="line h-0.25 bg-orange w-full"></div>
      </div>
    </section>
  );
};
