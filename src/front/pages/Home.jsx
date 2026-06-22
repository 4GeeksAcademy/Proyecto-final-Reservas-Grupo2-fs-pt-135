import React from "react";
import Hero from "../components/Hero";
import { CategorySection } from "../components/CategoryCard";
import EliteProfessionals from "../components/EliteProfessionals";
import InfoSection from "../components/InfoSection";

const Home = () => {
  return (
    <div>

      <Hero />

      <CategorySection />

      <EliteProfessionals />

      <InfoSection />

    </div>
  );
};

export default Home;