import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/RegisterClient.css";

export const RegisterClient = () => {
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    console.log("API_URL REAL:", API_URL);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = `${API_URL}/api/auth/register/client`;
        console.log("Voy a hacer fetch a:", url);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    phone,
                    email,
                    password
                })
            });

            console.log("Status:", response.status);

            const data = await response.json();

            if (!response.ok) {
                console.log("Respuesta del backend:", data);
                alert(data.msg);
                return;
            }

            alert("Usuario registrado correctamente");
            navigate("/login");

        } catch (error) {
            console.error("Error completo:", error);
            alert("Error al conectar con el servidor");
        }
    };

    return (
        <div className="register-client-page">

            <div className="register-client-card">

                <span className="register-client-eyebrow">BOOKIFY</span>

                <h2>Crear cuenta cliente</h2>

                <p>
                    Regístrate para reservar servicios de forma rápida y sencilla.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="register-client-input-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Tu nombre"
                            required
                        />
                    </div>

                    <div className="register-client-input-group">
                        <label>Teléfono</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            placeholder="Tu teléfono"
                            required
                        />
                    </div>

                    <div className="register-client-input-group">
                        <label>Correo electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="ejemplo@email.com"
                            required
                        />
                    </div>

                    <div className="register-client-input-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Mínimo 8 caracteres"
                            required
                        />
                    </div>

                    <button type="submit" className="register-client-button">
                        Registrarme
                    </button>

                </form>

                <p className="register-client-login-text">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>

            </div>

        </div>
    );
};