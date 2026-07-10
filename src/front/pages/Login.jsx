import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterRoleModal } from "../components/RegisterRoleModal";
import "../styles/Login.css";

import bookifyLogo from "../assets/img/img/bookify-logo.png";
import loginImage from "../assets/img/img/IMG-LOGIN.png";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const checkBusinessSetup = async (token) => {
    const response = await fetch(`${API_URL}/api/business-profile/setup-status`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      navigate("/business/portfolio");
      return;
    }

    if (!data.has_portfolio) {
      navigate("/business/portfolio");
      return;
    }

    if (!data.has_working_schedule || !data.has_services) {
      navigate("/services/create");
      return;
    }

    navigate("/home-business");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
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
        await checkBusinessSetup(data.token);
        return;
      }

      navigate("/home-client");

    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-page">
      <div className="login-layout">
        <div className="login-image-section">
          <img
            src={loginImage}
            alt="Reservas Bookify"
            className="login-hero-img"
          />
        </div>

        <div className="login-form-section">
          <div className="login-card">
            <img
              src={bookifyLogo}
              alt="Bookify"
              className="login-logo-img"
            />

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

              <button type="submit" className="login-button">
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
        </div>
      </div>

      <RegisterRoleModal
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};