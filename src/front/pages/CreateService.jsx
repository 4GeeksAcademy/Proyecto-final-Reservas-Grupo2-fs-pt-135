import React, { useEffect, useRef, useState } from "react";
import "../styles/CreateService.css";
import { useNavigate } from "react-router-dom";

export const CreateService = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [durationMinutes, setDurationMinutes] = useState("");

    const [openingTime, setOpeningTime] = useState("");
    const [closingTime, setClosingTime] = useState("");
    const [hasSchedule, setHasSchedule] = useState(false);

    const [services, setServices] = useState([]);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [editingServiceId, setEditingServiceId] = useState(null);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const formRef = useRef(null);
    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const scrollToForm = () => {
        setTimeout(() => {
            formRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 100);
    };

    const resetServiceForm = () => {
        setName("");
        setDescription("");
        setPrice("");
        setDurationMinutes("");
        setEditingServiceId(null);
        setShowServiceForm(false);
    };

    const openCreateForm = () => {
        setName("");
        setDescription("");
        setPrice("");
        setDurationMinutes("");
        setEditingServiceId(null);
        setShowServiceForm(true);
        setSuccessMessage("");
        setErrorMessage("");
        scrollToForm();
    };

    const loadServices = async () => {
        const token = sessionStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/api/services/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                setServices(data.services || []);
            }
        } catch (error) {
            console.error("Error loading services:", error);
        }
    };

    useEffect(() => {
        const loadSchedule = async () => {
            const token = sessionStorage.getItem("token");

            try {
                const response = await fetch(`${API_URL}/api/business-schedule/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (response.ok && data.schedule) {
                    setOpeningTime(data.schedule.opening_time);
                    setClosingTime(data.schedule.closing_time);
                    setHasSchedule(true);
                }
            } catch (error) {
                console.error("Error loading schedule:", error);
            }
        };

        loadSchedule();
        loadServices();
    }, [API_URL]);

    const handleScheduleSubmit = async (event) => {
        event.preventDefault();

        setSuccessMessage("");
        setErrorMessage("");

        if (!openingTime || !closingTime) {
            setErrorMessage("Debes seleccionar la hora de apertura y cierre");
            return;
        }

        if (openingTime >= closingTime) {
            setErrorMessage("La hora de cierre debe ser mayor que la hora de apertura");
            return;
        }

        const token = sessionStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/api/business-schedule/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    opening_time: openingTime,
                    closing_time: closingTime
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.error || data.msg || "Error al guardar el horario");
                return;
            }

            setHasSchedule(true);
            setSuccessMessage("Horario configurado correctamente. Ahora puedes gestionar tus servicios.");
        } catch (error) {
            setErrorMessage("Error al conectar con el servidor");
        }
    };

    const handleServiceSubmit = async (event) => {
        event.preventDefault();

        setSuccessMessage("");
        setErrorMessage("");

        if (!hasSchedule) {
            setErrorMessage("Primero debes configurar el horario laboral");
            return;
        }

        if (!name || !description || !price || !durationMinutes) {
            setErrorMessage("Completa todos los campos del servicio");
            return;
        }

        const token = sessionStorage.getItem("token");

        const url = editingServiceId
            ? `${API_URL}/api/services/${editingServiceId}`
            : `${API_URL}/api/services/`;

        const method = editingServiceId ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    description,
                    price: Number(price),
                    duration_minutes: Number(durationMinutes)
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.error || data.msg || "Error al guardar el servicio");
                return;
            }

            await loadServices();

            setSuccessMessage(
                editingServiceId
                    ? "Servicio actualizado correctamente"
                    : "Servicio creado correctamente"
            );

            resetServiceForm();
        } catch (error) {
            setErrorMessage("Error al conectar con el servidor");
        }
    };

    const handleEditService = (service) => {
        setName(service.name);
        setDescription(service.description || "");
        setPrice(service.price);
        setDurationMinutes(service.duration_minutes);
        setEditingServiceId(service.id);
        setShowServiceForm(true);
        setSuccessMessage("");
        setErrorMessage("");
        scrollToForm();
    };

    const handleDeleteService = async (serviceId) => {
        const confirmDelete = window.confirm("¿Seguro que quieres eliminar este servicio?");

        if (!confirmDelete) return;

        const token = sessionStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/api/services/${serviceId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.error || data.msg || "Error al eliminar el servicio");
                return;
            }

            await loadServices();
            setSuccessMessage("Servicio eliminado correctamente");
        } catch (error) {
            setErrorMessage("Error al conectar con el servidor");
        }
    };

    return (
        <main className="create-service-page">
            <section className="create-service-card">
                <div className="create-service-header">
                    <span className="create-service-eyebrow">BOOKIFY</span>
                    <h1>Configurar servicios</h1>
                    <p>Define tu horario laboral y gestiona los servicios que tus clientes podrán reservar.</p>
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

                <form onSubmit={handleScheduleSubmit} className="create-service-form schedule-form">
                    <div className="create-service-section-title">
                        <h2>Horario laboral</h2>
                        <p>Este horario se usará para calcular las franjas disponibles de reserva.</p>
                    </div>

                    <div className="create-service-grid">
                        <div className="create-service-field">
                            <label>Hora de apertura</label>
                            <input
                                type="time"
                                value={openingTime}
                                onChange={(event) => setOpeningTime(event.target.value)}
                            />
                        </div>

                        <div className="create-service-field">
                            <label>Hora de cierre</label>
                            <input
                                type="time"
                                value={closingTime}
                                onChange={(event) => setClosingTime(event.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" className="create-service-button secondary">
                        {hasSchedule ? "Actualizar horario" : "Guardar horario"}
                    </button>
                </form>

                {showServiceForm && (
                    <form
                        ref={formRef}
                        onSubmit={handleServiceSubmit}
                        className="create-service-form service-editor-form"
                    >
                        <div className="create-service-section-title">
                            <h2>{editingServiceId ? "Editar servicio" : "Crear servicio"}</h2>
                            <p>Agrega nombre, precio y duración del servicio.</p>
                        </div>

                        <div className="create-service-field">
                            <label>Nombre del servicio</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Ej: Corte de pelo"
                                disabled={!hasSchedule}
                            />
                        </div>

                        <div className="create-service-field">
                            <label>Descripción</label>
                            <textarea
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                placeholder="Ej: Corte clásico con lavado y peinado"
                                rows="4"
                                disabled={!hasSchedule}
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
                                    disabled={!hasSchedule}
                                />
                            </div>

                            <div className="create-service-field">
                                <label>Duración en minutos</label>
                                <input
                                    type="number"
                                    value={durationMinutes}
                                    onChange={(event) => setDurationMinutes(event.target.value)}
                                    placeholder="Ej: 30"
                                    disabled={!hasSchedule}
                                />
                            </div>
                        </div>

                        <div className="service-form-actions">
                            <button type="submit" className="create-service-button" disabled={!hasSchedule}>
                                {editingServiceId ? "Guardar cambios" : "Crear servicio"}
                            </button>

                            <button type="button" className="create-service-button secondary" onClick={resetServiceForm}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                )}

                <div className={`service-form-wrapper ${!hasSchedule ? "disabled" : ""}`}>
                    <div className="create-service-section-title service-list-header">
                        <div>
                            <h2>Servicios creados</h2>
                            <p>Administra los servicios que ofrece tu negocio.</p>
                        </div>

                        <button
                            type="button"
                            className="create-service-add-button"
                            disabled={!hasSchedule}
                            onClick={openCreateForm}
                        >
                            + Añadir servicio
                        </button>
                    </div>

                    {!hasSchedule && (
                        <div className="service-locked-message">
                            Primero configura tu horario laboral para poder crear servicios.
                        </div>
                    )}

                    {hasSchedule && services.length === 0 && (
                        <div className="service-empty-message">
                            Aún no tienes servicios creados. Agrega tu primer servicio para que los clientes puedan reservar.
                        </div>
                    )}

                    {services.length > 0 && (
                        <div className="services-list">
                            {services.map((service) => (
                                <div className="service-card-item" key={service.id}>
                                    <div>
                                        <h3>{service.name}</h3>
                                        <p>{service.description}</p>
                                        <span>{service.duration_minutes} min · €{service.price}</span>
                                    </div>

                                    <div className="service-card-actions">
                                        <button type="button" onClick={() => handleEditService(service)}>
                                            Editar
                                        </button>

                                        <button type="button" className="danger" onClick={() => handleDeleteService(service.id)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {hasSchedule && services.length > 0 && (
                        <button
                            type="button"
                            className="create-service-button"
                            onClick={() => navigate("/home-business")}
                        >
                            Ir al panel de empresa
                        </button>
                    )}
                </div>
            </section>
        </main>
    );
};