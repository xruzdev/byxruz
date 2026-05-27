export interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  isFeatured: boolean;
  date: string; // Optional date field
}

export const projects: Project[] = [
  {
    title: "Gimnasio Efi",
    description: "Sitio web.",
    image: "/images/projects/efi-gym.jpg",
    link: "https://www.gimnasioefi.com.ar/",
    isFeatured: true,
    date: "07-2024",
  },
   {
    title: "Modul House",
    description: "Sitio web con cotizador, autoadministrable.",
    image: "/images/projects/modul-house.jpg",
    link: "https://www.modulhouse.com.ar/",
    isFeatured: false,
    date: "04-2025",
  },
  {
    title: "Federacion Bonaerense de Basquetbol",
    description: "Sitio web de noticias, autoadministrable.",
    image: "/images/projects/federacion-bonaerense.jpg",
    link: "https://www.federacionbonaerense.com.ar/",
    isFeatured: true,
    date: "08-2024",
  },
  {
    title: "Squadra Construcciones",
    description: "Sitio web.",
    image: "/images/projects/squadra-construcciones.jpg",
    link: "https://squadra.com.ar/",
    isFeatured: false,
    date: "09-2024",
  },
  {
    title: "Ivana Trama",
    description: "Sitio web ecommerce, autoadministrable.",
    image: "/images/projects/ivana-trama.jpg",
    link: "https://www.dermatoivanatrama.com.ar/",
    isFeatured: false,
    date: "12-2024",
  },
   
  {
    title: "Estudio Martinez Hesselink",
    description: "Sitio web.",
    image: "/images/projects/estudio-martinez-hesselink.jpg",
    link: "https://martinezhesselink.netlify.app/",
    isFeatured: false,
    date: "02-2025",
  },
  {
    title: "Vespa Bahia Blanca",
    description: "Antigua pagina de la concesionaria oficial Vespa en Bahía Blanca. Sitio web ecommerce, autoadministrable.",
    image: "/images/projects/vespa.jpg",
    link: "https://vespa-bahia.vercel.app/",
    isFeatured: false,
    date: "03-2025",
  },
 
  {
    title: "Hornos Tatacuá",
    description: "Sitio web con catalogo de productos, autoadministrable.",
    image: "/images/projects/hornos-tatacua.jpg",
    link: "https://www.hornostatacua.com.ar/",
    isFeatured: false,
    date: "09-2024",
  },
  {
    title: "Flex Mkt Agency",
    description: "Landing page.",
    image: "/images/projects/flex.jpg",
    link: "https://www.flexmkt.com.ar/",
    isFeatured: false,
    date: "06-2025",
  },
  {
    title: "Milano Pádel",
    description: "Sitio web.",
    image: "/images/projects/milano.jpg",
    link: "https://www.milanopadel.com.ar/",
    isFeatured: false,
    date: "07-2025",
  },
  {
    title: "Bodega Trina",
    description: "Sitio web ecommerce en Wordpress.",
    image: "/images/projects/bodega-trina.jpg",
    link: "https://www.bodegatrina.com.ar/",
    isFeatured: true,
    date: "10-2025",
  },
  {
    title: "Il Picheno",
    description: "Sitio web para inmobiliaria en Wordpress.",
    image: "/images/projects/il-picheno.jpg",
    link: "https://www.ilpicheno.com.ar/",
    isFeatured: false,
    date: "12-2025",
  },
  {
    title: "Bahía Mates",
    description: "Sitio web en Wordpress.",
    image: "/images/projects/bahia-mates.jpg",
    link: "https://www.bahiamates.com.ar/",
    isFeatured: false,
    date: "12-2025",
  },
  {
    title: "Sabor Group",
    description: "Sitio web con vistas de proyectos, autoadministrable.",
    image: "/images/projects/sabor-grp.jpg",
    link: "https://www.saborgrp.com/",
    isFeatured: true,
    date: "04-2026",
  },
  {
    title: "Compañía de Mar",
    description: "Landing page.",
    image: "/images/projects/compania-de-mar.jpg",
    link: "https://companiademar.pages.dev/",
    isFeatured: false,
    date: "04-2026",
  },
  {
    title: "Grupo Casalini",
    description: "Sitio web institucional para un grupo automotriz, en construcción.",
    image: "/images/projects/casalini.jpg",
    link: "https://casalini-automotres-gilt.vercel.app/",
    isFeatured: true,
    date: "05-2026",
  },
];

export const featuredProjects = projects.filter(
  (project) => project.isFeatured
);
