import { useEffect, useState } from "react";
import "../../styles/BusinessCalendar.css";
import { ConfirmModal } from "../ConfirmModal";

const BusinessCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [reservations, setReservations] = useState([]);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const response = await fetch(`${API_URL}/api/reservations/business/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setReservations(data.reservations || []);
      } catch (error) {
        console.error("Error loading business reservations:", error);
      }
    };

    loadReservations();
  }, [API_URL]);

  const monthName = currentDate.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let firstDay = new Date(year, month, 1).getDay();
  firstDay = firstDay === 0 ? 6 : firstDay - 1;

  const days = [];

  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let day = 1; day <= daysInMonth; day++) days.push(day);

  const formatDate = (day) => {
    const monthFormatted = String(month + 1).padStart(2, "0");
    const dayFormatted = String(day).padStart(2, "0");
    return `${year}-${monthFormatted}-${dayFormatted}`;
  };

  const getReservationsByDate = (date) => {
    return reservations.filter(
      (reservation) =>
        reservation.appointment_datetime?.split("T")[0] === date
    );
  };

  const hasReservations = (day) => {
    if (!day) return false;
    return getReservationsByDate(formatDate(day)).length > 0;
  };

  const handleDayClick = (day) => {
    if (!day) return;

    const date = formatDate(day);
    const reservationsByDate = getReservationsByDate(date);

    if (reservationsByDate.length > 0) {
      setSelectedDate(date);
    }
  };

  const openCancelModal = (reservation) => {
    setReservationToCancel(reservation);
    setShowCancelModal(true);
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
    setReservationToCancel(null);
  };

  const cancelReservation = async () => {
    if (!reservationToCancel) return;

    try {
      setCancelLoading(true);

      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/reservations/${reservationToCancel.id}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al cancelar la reserva");
      }

      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === reservationToCancel.id
            ? { ...reservation, status: "Cancelada" }
            : reservation
        )
      );

      closeCancelModal();
    } catch (error) {
      console.error("Error canceling reservation:", error);
    } finally {
      setCancelLoading(false);
    }
  };

  const goToPreviousMonth = () => {
    setSelectedDate(null);
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setSelectedDate(null);
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const selectedReservations = selectedDate
    ? getReservationsByDate(selectedDate)
    : [];

  return (
    <section className="business-calendar">
      {!selectedDate ? (
        <>
          <div className="calendar-header">
            <div>
              <span className="calendar-label">Calendario</span>
              <h2>{monthName}</h2>
            </div>

            <div className="calendar-actions">
              <button onClick={goToPreviousMonth}>‹</button>
              <button onClick={goToNextMonth}>›</button>
            </div>
          </div>

          <div className="calendar-box">
            <div className="calendar-weekdays">
              <span>L</span>
              <span>M</span>
              <span>X</span>
              <span>J</span>
              <span>V</span>
              <span>S</span>
              <span>D</span>
            </div>

            <div className="calendar-grid">
              {days.map((day, index) => (
                <button
                  key={index}
                  className={`calendar-day ${
                    hasReservations(day) ? "has-reservations" : ""
                  }`}
                  onClick={() => handleDayClick(day)}
                  disabled={!day}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="reservations-view">
          <button className="back-button" onClick={() => setSelectedDate(null)}>
            ‹ Volver al calendario
          </button>

          <h2>Reservas del {selectedDate}</h2>

          <div className="reservation-cards">
            {selectedReservations.map((reservation) => (
              <article className="reservation-card" key={reservation.id}>
                <span>
                  {reservation.appointment_datetime?.split("T")[1]?.slice(0, 5)}
                </span>

                <h3>{reservation.service_detail?.name}</h3>
                <p>{reservation.client_name}</p>
                <p>Estado: {reservation.status}</p>

                {reservation.status === "Activa" && (
                  <button
                    className="cancel-reservation-button"
                    onClick={() => openCancelModal(reservation)}
                  >
                    Cancelar reserva
                  </button>
                )}
              </article>
            ))}
          </div>
        </div>
      )}

      <ConfirmModal
        show={showCancelModal}
        title="Cancelar reserva"
        message="¿Estás seguro de que deseas cancelar esta reserva?"
        confirmText="Sí, cancelar"
        cancelText="Volver"
        loading={cancelLoading}
        onConfirm={cancelReservation}
        onCancel={closeCancelModal}
      />
    </section>
  );
};

export default BusinessCalendar;