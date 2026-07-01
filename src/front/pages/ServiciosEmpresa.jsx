import React from "react";
import { useParams } from "react-router-dom";
import { empresasMock } from "../components/mockdata";

export const ServiciosEmpresa = () => {
  const { id } = useParams();
  const empresa = empresasMock.find((emp) => emp.id === parseInt(id));

  if (!empresa) return <h2>Empresa no encontrada</h2>;

  return (
    <div className="servicios-solo-container">

      <div className="servicios-grid">
        {empresa.servicios.map((servicio, index) => (
          <div key={index} className="servicio-card">
            <h3>{servicio.titulo}</h3>
            <p>{servicio.descripcion}</p>
          </div>
        ))}
      </div>

    </div>
  );
};