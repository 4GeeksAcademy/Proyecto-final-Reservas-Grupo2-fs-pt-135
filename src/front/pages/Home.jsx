import React from "react";
import Hero from "../components/Hero";
import { CategorySection } from "../components/CategoryCard";
import Empresas from "../components/Empresas";
import EliteProfessionals from "../components/EliteProfessionals";
import InfoSection from "../components/InfoSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <CategorySection />
      <Empresas />
      <EliteProfessionals />
      <InfoSection />
    </div>
  );
};

export default Home;