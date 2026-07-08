import { Link } from "react-router-dom";

const ReservationsSection = () => {
  return (
    <section className="home-section-container">
      <h2 className="home-section-title">Próximas reservas</h2>

      <div className="home-reservations-card">
        <div className="home-reservations-info">
          <i className="bi bi-calendar-check"></i>

          <h4>Gestiona tus reservas</h4>

          <p>
            Consulta, modifica o cancela tus próximas citas desde un solo lugar.
          </p>
        </div>

        <Link
          to="/client/reservations"
          className="home-reservations-btn"
        >
          Gestionar reservas
        </Link>
      </div>
    </section>
  );
};

export default ReservationsSection;