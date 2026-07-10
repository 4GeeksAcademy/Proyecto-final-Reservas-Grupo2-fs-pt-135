export default function BusinessTodayReservations() {
  return (
    <section className="business-today-section">
      <div className="business-today-header">
        <div>
          <p className="business-home-eyebrow">Reservas</p>
          <h2>Reservas del día</h2>
        </div>

        <span className="business-today-count">3 pendientes</span>
      </div>

      <div className="business-today-grid">
        <article className="business-reservation-item">
          <span>09:00</span>

          <div>
            <strong>Corte de cabello</strong>
            <p>Cliente: Carlos Medina</p>
          </div>
        </article>

        <article className="business-reservation-item">
          <span>11:30</span>

          <div>
            <strong>Barba completa</strong>
            <p>Cliente: Daniel Pérez</p>
          </div>
        </article>

        <article className="business-reservation-item">
          <span>16:00</span>

          <div>
            <strong>Servicio premium</strong>
            <p>Cliente: María López</p>
          </div>
        </article>
      </div>
    </section>
  );
}