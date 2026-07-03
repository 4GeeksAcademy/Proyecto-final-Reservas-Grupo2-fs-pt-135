import React, { useState } from "react";
import "../styles/CreateService.css";

export const CreateService = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [durationMinutes, setDurationMinutes] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSuccessMessage("");
        setErrorMessage("");

        const token = sessionStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/api/services/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    description,
                    price,
                    duration_minutes: durationMinutes
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.error || data.msg || "Error al crear el servicio");
                return;
            }

            setSuccessMessage("Servicio creado correctamente");

            setName("");
            setDescription("");
            setPrice("");
            setDurationMinutes("");

        } catch (error) {
            setErrorMessage("Error al conectar con el servidor");
        }
    };

    return (
    <main className="create-service-page">
        <section className="create-service-card">
            <div className="create-service-header">
                <span className="create-service-eyebrow">BOOKIFY</span>
                <h1>Crear servicio</h1>
                <p>Agrega los servicios que tus clientes podrán reservar.</p>
            </div>

            {successMessage && (
                <div className="create-service-alert success">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="create-service-alert error">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="create-service-form">
                <div className="create-service-field">
                    <label>Nombre del servicio</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Ej: Corte de pelo"
                    />
                </div>

                <div className="create-service-field">
                    <label>Descripción</label>
                    <textarea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Ej: Corte clásico con lavado y peinado"
                        rows="4"
                    />
                </div>

                <div className="create-service-grid">
                    <div className="create-service-field">
                        <label>Precio</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                            placeholder="Ej: 20"
                        />
                    </div>

                    <div className="create-service-field">
                        <label>Duración en minutos</label>
                        <input
                            type="number"
                            value={durationMinutes}
                            onChange={(event) => setDurationMinutes(event.target.value)}
                            placeholder="Ej: 30"
                        />
                    </div>
                </div>

                <button type="submit" className="create-service-button">
                    Crear servicio
                </button>
            </form>
        </section>
    </main>
);}