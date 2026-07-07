import { useEffect, useState } from "react";

export default function BusinessHero() {
  const [todayReservationsCount, setTodayReservationsCount] = useState(0);
  const [loadingReservations, setLoadingReservations] = useState(true);

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const loadTodayReservations = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          setLoadingReservations(false);
          return;
        }

        const response = await fetch(`${API_URL}/api/reservations/business/today`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setLoadingReservations(false);
          return;
        }

        setTodayReservationsCount(data.count || 0);
      } catch (error) {
        console.error("Error loading today's reservations:", error);
      } finally {
        setLoadingReservations(false);
      }
    };

    loadTodayReservations();
  }, [API_URL]);

  const reservationsMessage = loadingReservations
    ? "Cargando reservas..."
    : todayReservationsCount === 0
      ? "Hoy no tienes reservas"
      : `Hoy tienes ${todayReservationsCount} ${
          todayReservationsCount === 1 ? "reserva" : "reservas"
        }`;

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
          {reservationsMessage}
        </div>
      </div>
    </section>
  );
}