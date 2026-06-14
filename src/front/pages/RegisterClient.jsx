import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const RegisterClient = () => {
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!API_URL) {
            alert("Falta configurar VITE_BACKEND_URL");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
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

            const data = await response.json();

            if (!response.ok) {
                alert(data.msg);
                return;
            }

            alert("Usuario registrado correctamente");

            console.log(data);

            navigate("/login");

        } catch (error) {
            console.log(error);
            alert("Error al conectar con el servidor");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow p-4" style={{ maxWidth: "460px", width: "100%" }}>

                <h2 className="text-center mb-4">Crear cuenta</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} placeholder="Tu nombre" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Teléfono</label>
                        <input type="text" className="form-control" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Tu teléfono" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Correo electrónico</label>
                        <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="ejemplo@email.com" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Mínimo 8 caracteres" />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Registrarme</button>

                </form>

                <p className="text-center mt-3 mb-0">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>

            </div>
        </div>
    );
};