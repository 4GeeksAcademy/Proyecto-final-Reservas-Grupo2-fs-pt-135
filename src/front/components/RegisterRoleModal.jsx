import React from "react";
import { useNavigate } from "react-router-dom";

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
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: "9999" }}>

            <div className="bg-white p-5 rounded shadow" style={{ width: "900px", maxWidth: "90%" }}>

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>¿Qué tipo de cuenta deseas crear?</h2>

                    <button className="btn-close" onClick={() => setShowModal(false)}>
                    </button>

                </div>

                <p className="text-center text-muted mb-5">
                    Selecciona la mejor opcion
                </p>

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <div className="card h-100 text-center p-4">

                            <h3>👤</h3>

                            <h3 className="text-primary">
                                CLIENTE
                            </h3>

                            <p>
                                Quiero reservar servicios y encontrar lo que necesito
                            </p>

                            <button className="btn btn-primary" onClick={() => handleSelectRole("client")}>
                                Soy cliente
                            </button>

                        </div>

                    </div>

                    <div className="col-md-6 mb-3">

                        <div className="card h-100 text-center p-4">

                            <h3>🏢</h3>

                            <h3 className="text-success">
                                EMPRESA
                            </h3>

                            <p>
                                Quiero ofrecer mis servicios y hacer crecer mi negocio
                            </p>

                            <button className="btn btn-success" onClick={() => handleSelectRole("business")}>
                                Soy empresa
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};