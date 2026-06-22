import React from "react";

const Hero = () => {
  return (
    <section className="hero-section">

      <div className="hero-overlay">

        <p className="hero-subtitle">
          Servicios premium, profesionales y atención personalizada.
        </p>

        <div className="search-box">

          <input
            type="text"
            placeholder="Buscar servicios..."
          />

          <input
            type="date"
          />

          <input
            type="text"
            placeholder="Ubicación..."
          />

          <button>
            BUSCAR
          </button>

        </div>

      </div>

    </section>
  );
};

export default Hero;