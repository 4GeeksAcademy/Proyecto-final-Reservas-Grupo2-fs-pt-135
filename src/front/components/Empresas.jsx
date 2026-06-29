import React from "react";
import { Link } from "react-router-dom";
import { empresasMock } from "./mockdata";

const Empresas = () => {
  return (
    <section className="empresas-container">
      <h2 className="section-title cobre-metalizado">Empresas destacadas</h2>

      <div className="empresas-grid">
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
    </section>
  );
};

export default Empresas;