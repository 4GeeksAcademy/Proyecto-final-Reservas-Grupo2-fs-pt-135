import React from "react";
import { useOutletContext } from "react-router-dom";

const Hero = () => {
  const { setShowModal } = useOutletContext();

  return (
    <section className="hero-section">

      <div className="hero-overlay">

        <p className="hero-subtitle">
          Servicios premium, profesionales y atención personalizada.
        </p>

        <div className="search-box">

          <input type="text" placeholder="Buscar servicios..." />
          <input type="date" />
          <input type="text" placeholder="Ubicación..." />
          {/* BOTÓN QUE REDIRIGE */}
          <button onClick={() => setShowModal(true)}>BUSCAR</button>

        </div>

      </div>

    </section>
  );
};

export default Hero;