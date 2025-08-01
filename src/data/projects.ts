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
    isFeatured: false,
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
    link: "https://www.federacionbonaerense.com.ar/home",
    isFeatured: false,
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
    title: "Future gym",
    description: "Sitio web, en construcción.",
    image: "/images/projects/future.jpg",
    link: "https://future-gym.pages.dev/",
    isFeatured: false,
    date: "01-2025",
  },
  {
    title: "Estudio Martinez Hesselink",
    description: "Sitio web.",
    image: "/images/projects/estudio-martinez-hesselink.jpg",
    link: "https://martinezhesselink.com.ar/",
    isFeatured: false,
    date: "02-2025",
  },
  {
    title: "Vespa Bahia Blanca",
    description: "Sitio web ecommerce, autoadministrable.",
    image: "/images/projects/vespa.jpg",
    link: "https://www.vespabahia.com.ar/",
    isFeatured: true,
    date: "03-2025",
  },
 
  {
    title: "Hornos Tatacuá",
    description: "Sitio web con catalogo de productos, autoadministrable.",
    image: "/images/projects/hornos-tatacua.jpg",
    link: "https://www.hornostatacua.com.ar/",
    isFeatured: true,
    date: "09-2024",
  },
  {
    title: "Flex Mkt Agency",
    description: "Landing page.",
    image: "/images/projects/flex.jpg",
    link: "https://www.flexmkt.com.ar/",
    isFeatured: true,
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
];

export const featuredProjects = projects.filter(
  (project) => project.isFeatured
);
