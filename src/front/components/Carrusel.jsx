import React from "react";
import { Link } from "react-router-dom";
import { empresasMock } from "./mockdata";

const Empresas = () => {
  const [index, setIndex] = React.useState(0);
  const ITEMS_VISIBLE = 3;

  const next = () => {
    if (index >= empresasMock.length - ITEMS_VISIBLE) {
      setIndex(0); // infinito
    } else {
      setIndex(index + 1); // avanza de 1 en 1
    }
  };

  const prev = () => {
    if (index === 0) {
      setIndex(empresasMock.length - ITEMS_VISIBLE); // infinito hacia atrás
    } else {
      setIndex(index - 1); // retrocede de 1 en 1
    }
  };

  const translateX = -(index * 320); // 300px card + 20px gap

  return (
    <section className="empresas-container">

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <button onClick={prev} className="btn btn-secondary">
          Anterior
        </button>

        <div style={{ overflow: "hidden", width: "960px" }}>
          <div
            className="empresas-grid carrusel-slide"
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {empresasMock.map((empresa) => (
              <div key={empresa.id} className="empresa-card">
                <div className="empresa-card-img-wrapper">
                  <img
                    src={empresa.imagen}
                    alt={empresa.nombre}
                    className="empresa-card-img"
                  />
                  <img
                    src={empresa.logo}
                    alt={`Logo de ${empresa.nombre}`}
                    className="empresa-card-logo"
                  />
                </div>

                <div className="empresa-card-body">
                  <h3 className="empresa-card-title cobre-metalizado">
                    {empresa.nombre}
                  </h3>

                  <p className="empresa-card-location">
                    {empresa.ubicacion} · {empresa.rating} ⭐
                  </p>

                  <p className="empresa-card-description">
                    {empresa.descripcion}
                  </p>

                  <Link
                    to={`/empresa/${empresa.id}`}
                    className="btn-ver-detalles"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={next} className="btn btn-primary">
          Siguiente
        </button>
      </div>
    </section>
  );
};

export default Empresas;
