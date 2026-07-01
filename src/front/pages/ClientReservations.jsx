import React, { useState } from "react";
import "../styles/ClientReservations.css";
import { ReservationCard } from "../components/ReservationCard";
import { ReservationDetailModal } from "../components/ReservationDetailModal";

export const ClientReservations = () => {
    const [selectedReservation, setSelectedReservation] = useState(null);

    const reservations = [
        {
            id: 1,
            businessName: "Barbería Premium",
            service: "Corte + Barba",
            date: "Hoy, 26 de junio",
            time: "17:00",
            price: "20 €",
            status: "Activa",
            notes: "Llegar 5 minutos antes.",
            image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500"
        },
        {
            id: 2,
            businessName: "Laura Spa",
            service: "Masaje relajante",
            date: "Mañana, 27 de junio",
            time: "10:00",
            price: "45 €",
            status: "Activa",
            notes: "",
            image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500"
        },
        {
            id: 3,
            businessName: "Beauty Nails",
            service: "Manicura",
            date: "20 junio",
            time: "16:00",
            price: "18 €",
            status: "Completada",
            notes: "",
            image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500"
        },
        {
            id: 4,
            businessName: "Miguel Barber",
            service: "Corte clásico",
            date: "15 junio",
            time: "12:00",
            price: "15 €",
            status: "Cancelada",
            notes: "Cancelada por el cliente.",
            image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500"
        }
    ];

    const activeReservations = reservations.filter(
        reservation => reservation.status === "Activa"
    );

    const pastReservations = reservations.filter(
        reservation => reservation.status !== "Activa"
    );

    const handleReservationClick = (reservation) => {
        setSelectedReservation(reservation);
    };

    const handleCloseModal = () => {
        setSelectedReservation(null);
    };

    return (
        <main className="client-reservations-page">
            <div className="container py-5">

                <div className="mb-5">
                    <h1 className="reservations-title">Mis reservas</h1>
                    <p className="reservations-subtitle">
                        Gestiona todas tus citas desde un solo lugar.
                    </p>
                </div>

                <div className="row g-4 mb-5">
                    <div className="col-12 col-lg-6">
                        <div className="summary-card">
                            <div className="summary-icon">
                                <i className="fa-regular fa-calendar"></i>
                            </div>

                            <div>
                                <h2>{activeReservations.length}</h2>
                                <h5>Reservas activas</h5>
                                <p>Tienes {activeReservations.length} citas próximas</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="summary-card">
                            <div className="summary-icon">
                                <i className="fa-regular fa-clock"></i>
                            </div>

                            <div>
                                <h2>{pastReservations.length}</h2>
                                <h5>Historial</h5>
                                <p>Reservas anteriores</p>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="mb-5">
                    <div className="section-title">
                        <i className="fa-regular fa-calendar"></i>
                        <h3>Reservas activas</h3>
                    </div>

                    <div className="reservations-container">
                        {activeReservations.map((reservation) => (
                            <ReservationCard
                                key={reservation.id}
                                reservationId={reservation.id}
                                businessName={reservation.businessName}
                                service={reservation.service}
                                date={reservation.date}
                                time={reservation.time}
                                price={reservation.price}
                                status={reservation.status}
                                image={reservation.image}
                                onClick={() => handleReservationClick(reservation)}
                            />
                        ))}
                    </div>
                </section>

                <section>
                    <div className="section-title">
                        <i className="fa-solid fa-clock-rotate-left"></i>
                        <h3>Reservas anteriores</h3>
                    </div>

                    <div className="reservations-container">
                        {pastReservations.map((reservation) => (
                            <ReservationCard
                                key={reservation.id}
                                reservationId={reservation.id}
                                businessName={reservation.businessName}
                                service={reservation.service}
                                date={reservation.date}
                                time={reservation.time}
                                price={reservation.price}
                                status={reservation.status}
                                image={reservation.image}
                                onClick={() => handleReservationClick(reservation)}
                            />
                        ))}
                    </div>
                </section>

                <ReservationDetailModal
                    show={selectedReservation !== null}
                    onClose={handleCloseModal}
                    reservation={selectedReservation}
                />

            </div>
        </main>
    );
};