import React, { useState } from "react";
import { RegisterRoleModal } from "../components/RegisterRoleModal";

export const Login = () => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.msg);
        return;
      }

      sessionStorage.setItem("token", data.token);

      alert("Login exitoso");

      console.log(data);

    } catch (error) {
      console.log(error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Iniciar sesión</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="ejemplo@email.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Tu contraseña"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Entrar
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          ¿No tienes cuenta? <button type="button" className="btn btn-link p-0" onClick={() => setShowModal(true)}> Regístrate </button>
        </p>
      </div>

      <RegisterRoleModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};