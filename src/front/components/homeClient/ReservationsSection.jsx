import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ReservationsSection = () => {
  const [reservations, setReservations] = useState([]);

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) return;

        const response = await fetch(`${API_URL}/api/reservations/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setReservations(data.reservations || []);
      } catch (error) {
        console.error("Error loading reservations:", error);
      }
    };

    loadReservations();
  }, [API_URL]);

  return (
    <section className="home-section-container">
      <div className="home-section-header">
        <h2 className="home-section-title">Reservas activas</h2>

        <Link to="/client/reservations" className="home-section-link">
          Gestionar reservas
        </Link>
      </div>

      <div className="reservations-grid">
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <article key={reservation.id} className="reservation-card">
              <h3>{reservation.service_detail?.name || "Servicio reservado"}</h3>
              <p>Estado: {reservation.status}</p>
              <p>{reservation.notes || "Sin notas"}</p>
            </article>
          ))
        ) : (
          <p className="home-empty-message">
            No tienes reservas activas por ahora.
          </p>
        )}
      </div>
    </section>
  );
};

export default ReservationsSection;