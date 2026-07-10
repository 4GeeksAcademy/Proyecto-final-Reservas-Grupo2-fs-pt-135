import React from "react";
import { Link } from "react-router-dom";
import { empresasMock } from "./mockdata";
import Carrusel from "./Carrusel";

const Empresas = () => {
  const [index, setIndex] = React.useState(0);
  
  // Configuración de dimensiones
  const ITEMS_VISIBLE = 3;
  const CARD_WIDTH = 300;
  const GAP = 20;
  const STEP = CARD_WIDTH + GAP; // 320px
  
  // Ancho total de la ventana: (300*3) + (20*2) = 940px
  const WINDOW_WIDTH = (CARD_WIDTH * ITEMS_VISIBLE) + (GAP * (ITEMS_VISIBLE - 1));

  const next = () => {
    // Si el índice es menor que el número de tarjetas menos las 3 visibles
    if (index < empresasMock.length - ITEMS_VISIBLE) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const translateX = -(index * STEP);

  return (
    <section className="empresas-container" style={{ padding: "40px 0" }}>
      

      <div style={{ position: "relative", width: `${WINDOW_WIDTH}px`, margin: "0 auto" }}>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: "30px" }}>
        Empresas destacadas
      </h2>
        {/* Botón Anterior */}
        <button
          onClick={prev}
          className="btn btn-secondary btn-carrusel-anterior"
          disabled={index === 0}
          style={{
            position: "absolute",
            left: "-120px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
          }}
        >
          Anterior
        </button>

        {/* Ventana de visualización (Lo que corta las tarjetas) */}
        <div style={{ overflow: "hidden", width: `${WINDOW_WIDTH}px` }}>
          <div
            style={{
              display: "flex",
              gap: `${GAP}px`,
              transform: `translateX(${translateX}px)`,
              transition: "transform 0.5s ease-in-out",
              width: `${empresasMock.length * STEP}px`,
            }}
          >
            {empresasMock.map((empresa) => (
              <div 
                key={empresa.id}
                className="empresa-card-wrapper"
                style={{ width: `${CARD_WIDTH}px`, flexShrink: 0 }}
              >
                <div className="empresa-card-img-wrapper">
                  <img src={empresa.imagen} alt={empresa.nombre} className="empresa-card-img" />
                  <img src={empresa.logo} alt={`Logo de ${empresa.nombre}`} className="empresa-card-logo" />
                </div>

                <div className="empresa-card-body">
                  <h3 className="empresa-card-title">{empresa.nombre}</h3>
                  <p className="empresa-card-location">{empresa.ubicacion} · {empresa.rating} ⭐</p>
                  <p className="empresa-card-description">{empresa.descripcion}</p>
                  <Link to={`/empresa/${empresa.id}/servicios`} className="btn-ver-detalles">
                    Ver detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón Siguiente */}
        <button
          onClick={next}
          className="btn btn-primary btn-carrusel-siguiente"
          disabled={index >= empresasMock.length - ITEMS_VISIBLE}
          style={{
            position: "absolute",
            right: "-120px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
          }}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
};

export default Empresas;