import * as React from "react";
import HeroSection from "../components/Hero/Hero";

const rules = [
  {
    title: "Regla 1",
    description: "Cada participante recibe el nombre de otra persona al azar.",
    image: "/rule1.png", // Ruta a la imagen genérica para la regla 1
  },
  {
    title: "Regla 2",
    description: "Se establece un presupuesto minimo para el valor del regalo ",
    image: "/rule2.png", // Ruta a la imagen genérica para la regla 2
  },
  {
    title: "Regla 3",
    description: "Nadie debe revelar a quién le están comprando un regalo.",
    image: "/rule3.png", // Ruta a la imagen genérica para la regla 3
  },
  {
    title: "Regla 4",
    description: "En un día acordado, todos se reúnen y revelan sus regalos.",
    image: "/rule4.png", // Ruta a la imagen genérica para la regla 4
  },
];

const Home = () => {
  return <HeroSection />;
};

export default Home;
