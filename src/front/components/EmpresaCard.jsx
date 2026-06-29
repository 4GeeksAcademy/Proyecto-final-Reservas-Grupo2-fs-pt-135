import { Link } from "react-router-dom";

export default function EmpresaCard({
  id,
  nombre,
  descripcion,
  rating,
  logo,
  servicios,
  ubicacion,
  imagen,
  correo,
  telefono,
  subtitulo
}) {
  return (
    <Link to={`/empresa/${id}`} className="empresa-card">

      {/* Imagen principal */}
      <img src={imagen} alt={nombre} className="empresa-img" />

      <div className="empresa-info">

        {/* Logo */}
        <img src={logo} alt="logo" className="empresa-logo" />

        {/* Nombre */}
        <h3>{nombre}</h3>
        
        <p className="subtitulo">{subtitulo}</p>

        {/* Descripción */}
        <p>{descripcion}</p>


        {/* Rating */}
        <p className="rating">⭐ {rating}</p>

        {/* Servicios (solo muestra la cantidad) */}
        {servicios && (
          <p className="servicios-count">
            {servicios.length} servicios disponibles
          </p>
        )}

        {/* Pie de página con ubicación, correo y teléfono */}
        <div className="empresa-footer">
          <p className="ubicacion">📍 {ubicacion}</p>
          <p className="correo">✉️ {correo}</p>
          <p className="telefono">📞 {telefono}</p>
    
        </div>
      </div>

    </Link>
  );
}