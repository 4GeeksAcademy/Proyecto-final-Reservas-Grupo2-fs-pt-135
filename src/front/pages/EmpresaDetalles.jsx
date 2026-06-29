import { useParams } from "react-router-dom";
import { empresasMock } from "../components/mockdata";
import { ServiciosEmpresa } from "./ServiciosEmpresa";

export const EmpresaDetalles = () => {
  const { id } = useParams();
  const empresa = empresasMock.find((emp) => emp.id === parseInt(id));

  if (!empresa) return <h2>Empresa no encontrada</h2>;

  const telefono = "+34 600 123 456";
  const correoElectronico =
    "info@" + empresa.nombre.toLowerCase().replace(/\s+/g, "") + ".es";

  return (
    <div className="empresa-detalles-container">

      {/* TARJETA COMPLETA — SOLO UNA */}
      <div className="empresa-detalles-header empresa-detalles-header-sin-fondo">

        {/* Logo + nombre + ubicación */}
        <div className="empresa-logo-nombre">
          <img
            src={empresa.logo}
            alt={empresa.nombre}
            className="empresa-logo"
          />
          <h1 className="cobre-metalizado">{empresa.nombre}</h1>
          <p className="empresa-ubicacion">
            {empresa.ubicacion} · {empresa.rating} ⭐
          </p>
        </div>

        {/* Contacto + botón */}
        <div className="empresa-contacto">
          <p>✉️ {correoElectronico}</p>
          <p>📞 {telefono}</p>
          <button className="btn-reservar">Reservar ahora</button>
        </div>
      </div>

      {/* DESCRIPCIÓN */}
      <p className="empresa-descripcion">{empresa.descripcion}</p>

      {/* LISTADO DE SERVICIOS DENTRO DE LA MISMA TARJETA */}
      <ServiciosEmpresa empresa={empresa} />

    </div>
  );
};
