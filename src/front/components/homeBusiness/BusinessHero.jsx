export default function BusinessHero() {
  return (
    <section className="business-home-hero">
      <div className="business-home-hero-content">
        <p className="business-home-eyebrow">Panel de empresa</p>

        <h1>
          Administra tu negocio <span>desde un solo lugar</span>
        </h1>

        <p>
          Controla tus reservas, servicios, portfolio y agenda diaria con una
          experiencia simple y profesional.
        </p>

        <div className="business-home-hero-badge">
          <i className="bi bi-calendar-check"></i>
          Hoy tienes reservas pendientes por revisar
        </div>
      </div>
    </section>
  );
}