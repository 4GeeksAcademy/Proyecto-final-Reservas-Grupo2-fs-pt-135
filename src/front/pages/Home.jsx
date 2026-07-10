import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Hero from "../components/Hero";
import { CategorySection } from "../components/CategoryCard";
import Empresas from "../components/Empresas";
import EliteProfessionals from "../components/EliteProfessionals";
import InfoSection from "../components/InfoSection";

const Home = () => {
  const navigate = useNavigate();
  const { setShowModal } = useOutletContext();

  const irAlRegistro = () => {
    navigate("/login-signup");
  };
  
  return (
    <div>
      <Hero onRequireAuth={irAlRegistro} />
      <CategorySection setShowModal={setShowModal} />
      <Empresas />
      <EliteProfessionals />
      <InfoSection />
    </div>
  );
};

export default Home;