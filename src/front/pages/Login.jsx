import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterRoleModal } from "../components/RegisterRoleModal";

export const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

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
      sessionStorage.setItem("role", data.user.role);

      if (data.business_profile_id) {
        sessionStorage.setItem("business_profile_id", data.business_profile_id);
      }

      const roleName = data.user.role === "client" ? "Cliente" : "Empresa";

      alert(`Login exitoso como ${roleName}`);

      if (data.user.role === "business") {
        navigate("/business/portfolio");
      } else {
        navigate("/");
      }

    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-bg min-vh-100 d-flex justify-content-center align-items-center">

      <div className="login-card">

        <div className="login-icon">
          📅
        </div>

        <h2 className="login-title">Iniciar sesión</h2>

        <p className="login-subtitle">
          Accede a tu cuenta para continuar
        </p>

        <form onSubmit={handleSubmit}>

          <div className="login-input-group">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Correo electrónico"
              required
            />
          </div>

          <div className="login-input-group">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>

          <button
            type="submit"
            className="login-button"
          >
            Entrar
          </button>

        </form>

        <p className="register-text">
          ¿No tienes cuenta?{" "}
          <button
            type="button"
            onClick={() => setShowModal(true)}
          >
            Regístrate
          </button>
        </p>

      </div>

      <RegisterRoleModal
        showModal={showModal}
        setShowModal={setShowModal}
      />

    </div>
  );
};