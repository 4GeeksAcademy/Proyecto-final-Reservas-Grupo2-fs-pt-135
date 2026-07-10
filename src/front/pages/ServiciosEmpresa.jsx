import React from "react";
import { useParams } from "react-router-dom";
import { empresasMock } from "../components/mockdata";

export const ServiciosEmpresa = () => {
  const { id } = useParams();
  const empresa = empresasMock.find((emp) => emp.id === parseInt(id));

  if (!empresa) return <h2>Empresa no encontrada</h2>;

  return (
    <div className="servicios-solo-container">

      {/* HEADER IZQUIERDA / DERECHA */}
      <div className="empresa-servicios-header">

        {/* IMAGEN IZQUIERDA */}
        <div className="empresa-header">
          <img
            src={empresa.logo}
            alt={empresa.nombre}
            className="empresa-logo"
          />

          <div className="empresa-titulo">
            <h1>{empresa.nombre}</h1>
            <p>{empresa.subtitulo}</p>
          </div>
        </div>

        {/* IMAGEN PRINCIPAL */}
        <div className="empresa-servicios-img">
          <img
            src={empresa.imagen}
            alt={empresa.nombre}
            className="empresa-imagen"
          />
        </div>
      </div>

      {/* QUIENES SOMOS */}
      <div className="empresa-descripcion">
        <h2>Quiénes somos</h2>
        <p>{empresa.descripcion}</p>
      </div>

      {/* SERVICIOS */}
      <h2>Servicios disponibles</h2>
      <div className="servicios-grid">
        {empresa.servicios.map((servicio, index) => (
          <div key={index} className="servicio-card">
            <h3>{servicio.titulo}</h3>
            <p>{servicio.descripcion}</p>
          </div>
        ))}
      </div>

      {/* CONTACTO FINAL */}
      <div className="empresa-contacto">
        <h2>Contáctanos</h2>
        <p><strong>Ubicación:</strong> {empresa.ubicacion}</p>
        <p><strong>Correo:</strong> {empresa.correo}</p>
        <p><strong>Teléfono:</strong> {empresa.telefono}</p>
      </div>
    </div>
  );
};


