import React, { useState } from "react";

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
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow p-4" style={{ maxWidth: "600px", width: "100%" }}>
                <h2 className="text-center mb-4">Crear servicio</h2>

                {successMessage && (
                    <div className="alert alert-success" role="alert">
                        {successMessage}
                    </div>
                )}

                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre del servicio</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Ej: Corte de pelo"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Descripción</label>
                        <textarea
                            className="form-control"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            placeholder="Ej: Corte clásico con lavado y peinado"
                            rows="3"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Precio</label>
                        <input
                            type="number"
                            className="form-control"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                            placeholder="Ej: 20"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Duración en minutos</label>
                        <input
                            type="number"
                            className="form-control"
                            value={durationMinutes}
                            onChange={(event) => setDurationMinutes(event.target.value)}
                            placeholder="Ej: 30"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Crear servicio
                    </button>
                </form>
            </div>
        </div>
    );
};