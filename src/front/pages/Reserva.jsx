import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Reserva = () => {
    const { code } = useParams();
    const navigate = useNavigate();

    const [clientProfile, setClientProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [serviceId, setServiceId] = useState(code ? Number(code) : "");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");
    const [notes, setNotes] = useState("");
    const [message, setMessage] = useState("");

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const loadClientProfile = async () => {
            try {
                const token = sessionStorage.getItem("token");

                if (!token) {
                    setClientProfile(null);
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${API_URL}/api/client-profile/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = await response.json();

                if (!response.ok) {
                    setClientProfile(null);
                } else {
                    setClientProfile(data.client_profile || null);
                }
            } catch (error) {
                console.error("Error loading client profile:", error);
                setClientProfile(null);
            } finally {
                setLoading(false);
            }
        };

        loadClientProfile();
    }, [API_URL]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!clientProfile) {
            alert("Debes iniciar sesión y tener un perfil de cliente para crear una reserva.");
            navigate("/login");
            return;
        }

        if (!serviceId) {
            alert("El código de reserva (ID de servicio) es obligatorio.");
            return;
        }

        if (!appointmentDate || !appointmentTime) {
            alert("Selecciona la fecha y la hora de la cita.");
            return;
        }

        const appointment_datetime = new Date(`${appointmentDate}T${appointmentTime}`);

        try {
            const response = await fetch(`${API_URL}/api/reservations`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    client_id: clientProfile.id,
                    service_id: Number(serviceId),
                    appointment_datetime: appointment_datetime.toISOString(),
                    notes,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.error || data.msg || "No se pudo crear la reserva.");
                return;
            }

            // Al crear la reserva, redirigir a las reservas del cliente o mostrar éxito
            alert("Reserva creada correctamente.");
            navigate("/client-reservations");
        } catch (error) {
            console.error("Error creating reservation:", error);
            setMessage("Error de conexión al crear la reserva.");
        }
    };

    if (loading) {
        return (
            <main className="home-client-page">
                <section className="home-section-container">
                    <p className="home-empty-message">Cargando perfil...</p>
                </section>
            </main>
        );
    }

    return (
        <main className="home-client-page">
            <section className="home-section-container">
                <h2 className="home-section-title">Reservar servicio</h2>

                {message && <p className="home-empty-message">{message}</p>}

                <form className="reservation-form" onSubmit={handleSubmit}>
                    <label className="form-label">
                        Código de reserva (ID de servicio):
                        <input
                            type="number"
                            className="form-control"
                            value={serviceId}
                            onChange={(e) => setServiceId(e.target.value)}
                            placeholder="Introduce el código recibido"
                            required
                        />
                    </label>

                    <label className="form-label">
                        Fecha:
                        <input
                            type="date"
                            className="form-control"
                            value={appointmentDate}
                            onChange={(e) => setAppointmentDate(e.target.value)}
                            required
                        />
                    </label>

                    <label className="form-label">
                        Hora:
                        <input
                            type="time"
                            className="form-control"
                            value={appointmentTime}
                            onChange={(e) => setAppointmentTime(e.target.value)}
                            required
                        />
                    </label>

                    <label className="form-label">
                        Notas (opcional):
                        <textarea
                            className="form-control"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Indica detalles adicionales"
                        />
                    </label>

                    <div className="form-actions">
                        <button type="submit" className="business-detail-primary-button">
                            Confirmar reserva
                        </button>
                    </div>
                </form>

                {!clientProfile && (
                    <p className="home-empty-message">Debes iniciar sesión para completar la reserva.</p>
                )}
            </section>
        </main>
    );
};

export default Reserva;
