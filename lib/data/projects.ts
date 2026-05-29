export interface Project {
  title: string;
  description: string;
  coverImage: string;
  video: string;
  link: string;
  isFeatured: boolean;
  date: string; // Optional date field
}

export const projects: Project[] = [
  {
    title: "Gimnasio Efi",
    description: "Sitio web.",
    coverImage: "/images/projects/efi-gym.jpg",
    video: "/videos/projects/efi-gym.mp4",
    link: "https://www.gimnasioefi.com.ar/",
    isFeatured: true,
    date: "07-2024",
  },
   {
    title: "Modul House",
    description: "Sitio web con cotizador, autoadministrable.",
    coverImage: "/images/projects/modul-house.jpg",
    video: "/videos/projects/modul-house.mp4",
    link: "https://www.modulhouse.com.ar/",
    isFeatured: false,
    date: "04-2025",
  },
  {
    title: "Federacion Bonaerense de Basquetbol",
    description: "Sitio web de noticias, autoadministrable.",
    coverImage: "/images/projects/federacion-bonaerense.jpg",
      video: "/videos/projects/federacion-bonaerense.mp4",
    link: "https://www.federacionbonaerense.com.ar/",
    isFeatured: true,
    date: "08-2024",
  },
  {
    title: "Squadra Construcciones",
    description: "Sitio web.",
    coverImage: "/images/projects/squadra-construcciones.jpg",
    video: "/videos/projects/squadra-construcciones.mp4",
    link: "https://squadra.com.ar/",
    isFeatured: false,
    date: "09-2024",
  },
  {
    title: "Ivana Trama",
    description: "Sitio web ecommerce, autoadministrable.",
    coverImage: "/images/projects/ivana-trama.jpg",
    video: "/videos/projects/ivana-trama.mp4",
    link: "https://www.dermatoivanatrama.com.ar/",
    isFeatured: false,
    date: "12-2024",
  },
   
  {
    title: "Estudio Martinez Hesselink",
    description: "Sitio web.",
    coverImage: "/images/projects/estudio-martinez-hesselink.jpg",
    video: "/videos/projects/estudio-martinez-hesselink.mp4",
    link: "https://martinezhesselink.netlify.app/",
    isFeatured: false,
    date: "02-2025",
  },
  {
    title: "Vespa Bahia Blanca",
    description: "Antigua pagina de la concesionaria oficial Vespa en Bahía Blanca. Sitio web ecommerce, autoadministrable.",
    coverImage: "/images/projects/vespa.jpg",
    video: "/videos/projects/vespa.mp4",
    link: "https://vespa-bahia.vercel.app/",
    isFeatured: false,
    date: "03-2025",
  },
 
  {
    title: "Hornos Tatacuá",
    description: "Sitio web con catalogo de productos, autoadministrable.",
    coverImage: "/images/projects/hornos-tatacua.jpg",
    video: "/videos/projects/hornos-tatacua.mp4",
    link: "https://www.hornostatacua.com.ar/",
    isFeatured: false,
    date: "09-2024",
  },
  {
    title: "Flex Mkt Agency",
    description: "Landing page.",
    coverImage: "/images/projects/flex.jpg",
    video: "/videos/projects/flex.mp4",
    link: "https://www.flexmkt.com.ar/",
    isFeatured: false,
    date: "06-2025",
  },
  {
    title: "Milano Pádel",
    description: "Sitio web.",
    coverImage: "/images/projects/milano.jpg",
    video: "/videos/projects/milano.mp4",
    link: "https://www.milanopadel.com.ar/",
    isFeatured: false,
    date: "07-2025",
  },
  {
    title: "Bodega Trina",
    description: "Sitio web ecommerce en Wordpress.",
    coverImage: "/images/projects/bodega-trina.jpg",
    video: "/videos/projects/bodega-trina.mp4",
    link: "https://www.bodegatrina.com.ar/",
    isFeatured: true,
    date: "10-2025",
  },
  {
    title: "Il Picheno",
    description: "Sitio web para inmobiliaria en Wordpress.",
    coverImage: "/images/projects/il-picheno.jpg",
    video: "/videos/projects/il-picheno.mp4",
    link: "https://www.ilpicheno.com.ar/",

    isFeatured: false,
    date: "12-2025",
  },
  {
    title: "Bahía Mates",
    description: "Sitio web en Wordpress.",
    coverImage: "/images/projects/bahia-mates.jpg",
    video: "/videos/projects/bahia-mates.mp4",
    link: "https://www.bahiamates.com.ar/",
    isFeatured: false,
    date: "12-2025",
  },
  {
    title: "Sabor Group",
    description: "Sitio web con vistas de proyectos, autoadministrable.",
    coverImage: "/images/projects/sabor-grp.jpg",
    video: "/videos/projects/sabor-grp.mp4",
    link: "https://www.saborgrp.com/",
    isFeatured: true,
    date: "04-2026",
  },
  {
    title: "Compañía de Mar",
    description: "Landing page.",
    coverImage: "/images/projects/compania-de-mar.jpg",
    video: "/videos/projects/compania-de-mar.mp4",
    link: "https://companiademar.pages.dev/",
    isFeatured: false,
    date: "04-2026",
  },
  {
    title: "Grupo Casalini",
    description: "Sitio web institucional para un grupo automotriz, en construcción.",
    coverImage: "/images/projects/casalini.jpg",
    video: "/videos/projects/casalini.mp4",
    link: "https://casalini-automotres-gilt.vercel.app/",
    isFeatured: false,
    date: "05-2026",
  },
];

export const featuredProjects = projects.filter(
  (project) => project.isFeatured
);
