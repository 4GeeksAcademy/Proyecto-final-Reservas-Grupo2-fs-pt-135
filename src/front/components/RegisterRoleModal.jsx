import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterRoleModal.css";

export const RegisterRoleModal = ({ showModal, setShowModal }) => {
    const navigate = useNavigate();

    if (!showModal) return null;

    const handleSelectRole = (role) => {
        setShowModal(false);

        if (role === "client") {
            navigate("/register/client");
        }

        if (role === "business") {
            navigate("/register/business");
        }
    };

    return (
        <div className="role-modal-overlay">

            <div className="role-modal">

                <button
                    className="role-close"
                    onClick={() => setShowModal(false)}
                >
                    ✕
                </button>

                <h2>¿Qué tipo de cuenta deseas crear?</h2>

                <p>
                    Selecciona el tipo de cuenta con el que quieres comenzar.
                </p>

                <div className="role-options">

                    <div className="role-card">

                        <div className="role-icon">👤</div>

                        <h3>Cliente</h3>

                        <span>
                            Reserva servicios fácilmente.
                        </span>

                        <button
                            className="client-btn"
                            onClick={() => handleSelectRole("client")}
                        >
                            Crear cuenta
                        </button>

                    </div>

                    <div className="role-card">

                        <div className="role-icon">🏢</div>

                        <h3>Empresa</h3>

                        <span>
                            Gestiona reservas y haz crecer tu negocio.
                        </span>

                        <button
                            className="business-btn"
                            onClick={() => handleSelectRole("business")}
                        >
                            Crear cuenta
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};