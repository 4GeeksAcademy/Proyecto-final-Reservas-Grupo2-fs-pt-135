import { Link } from "react-router-dom";

export default function BusinessQuickActions() {
  return (
    <section className="business-quick-actions">
      <Link to="/services/create" className="business-action-card">
        <i className="bi bi-scissors"></i>

        <h3>Servicios</h3>

        <p>Crea, edita y administra los servicios de tu negocio.</p>
      </Link>

      <Link to="/business/portfolio" className="business-action-card">
        <i className="bi bi-stars"></i>

        <h3>Portfolio</h3>

        <p>Actualiza tu logo, descripción y galería de imágenes.</p>
      </Link>
    </section>
  );
}