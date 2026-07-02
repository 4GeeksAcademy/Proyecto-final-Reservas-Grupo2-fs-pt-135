import React, { useEffect, useState } from "react";
import "../styles/ClientReservations.css";
import { ReservationCard } from "../components/ReservationCard";
import { ReservationDetailModal } from "../components/ReservationDetailModal";
import { ConfirmModal } from "../components/ConfirmModal";

export const ClientReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [cancelLoading, setCancelLoading] = useState(false);

    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const clientId = 1; 

    const formatDate = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    const formatTime = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const mapReservationData = (reservation) => ({
        id: reservation.id,
        businessName: reservation.service_detail?.business_name || "Negocio",
        service: reservation.service_detail?.name || "Servicio",
        date: formatDate(reservation.appointment_datetime),
        time: formatTime(reservation.appointment_datetime),
        price: `${reservation.service_detail?.price || "0.00"} €`,
        status: reservation.status,
        notes: reservation.notes || "",
        image:
            reservation.service_detail?.business_logo ||
            reservation.service_detail?.business_image ||
            "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500"
    });

    const getClientReservations = async () => {
        try {
            const response = await fetch(`${API_URL}/api/reservations/client/${clientId}`);

            if (!response.ok) {
                throw new Error("Error al obtener las reservas");
            }

            const data = await response.json();
            setReservations(data.map(mapReservationData));
        } catch (error) {
            console.error("Error cargando reservas:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAskCancelReservation = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmCancelReservation = async () => {
        if (!selectedReservation) return;

        try {
            setCancelLoading(true);

            const response = await fetch(
                `${API_URL}/api/reservations/${selectedReservation.id}/cancel`,
                {
                    method: "PATCH"
                }
            );

            if (!response.ok) {
                throw new Error("Error al cancelar la reserva");
            }

            setShowConfirmModal(false);
            setSelectedReservation(null);

            await getClientReservations();
        } catch (error) {
            console.error("Error cancelando reserva:", error);
        } finally {
            setCancelLoading(false);
        }
    };

    useEffect(() => {
        getClientReservations();
    }, []);

    const activeReservations = reservations.filter(
        reservation => reservation.status === "Activa"
    );

    const pastReservations = reservations.filter(
        reservation => reservation.status !== "Activa"
    );

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

                {loading ? (
                    <p className="reservations-subtitle">Cargando reservas...</p>
                ) : (
                    <>
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
                                        onClick={() => setSelectedReservation(reservation)}
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
                                        onClick={() => setSelectedReservation(reservation)}
                                    />
                                ))}
                            </div>
                        </section>
                    </>
                )}

                <ReservationDetailModal
                    show={selectedReservation !== null && !showConfirmModal}
                    onClose={() => setSelectedReservation(null)}
                    reservation={selectedReservation}
                    onCancel={handleAskCancelReservation}
                />

                <ConfirmModal
                    show={showConfirmModal}
                    title="Cancelar reserva"
                    message="¿Estás seguro de que deseas cancelar esta reserva? Esta acción no se puede deshacer."
                    confirmText="Sí, cancelar"
                    cancelText="Volver"
                    loading={cancelLoading}
                    onConfirm={handleConfirmCancelReservation}
                    onCancel={() => setShowConfirmModal(false)}
                />
            </div>
        </main>
    );
};