import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserProfileView.css";

export const UserProfileView = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (password.length < 8) {
        setMessage("La contraseña debe tener al menos 8 caracteres.");
        return;
    }

    if (password !== confirmPassword) {
        setMessage("Las contraseñas no coinciden.");
        return;
    }

    try {
        const API_URL = import.meta.env.VITE_BACKEND_URL;
        const token = sessionStorage.getItem("token");

        const response = await fetch(`${API_URL}/api/auth/change-password`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            password,
        }),
        });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.msg || "No se pudo actualizar la contraseña.");
      return;
    }

    setMessage("Contraseña actualizada correctamente. Vuelve a iniciar sesión.");

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("business_profile_id");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  } catch (error) {
    setMessage("Error de conexión con el servidor.");
  }
};

  return (
    <main className="change-password-page">
      <section className="change-password-card">
        <span className="change-password-eyebrow">BOOKIFY</span>
        <h2>Cambiar contraseña</h2>
        <p>Actualiza la contraseña de acceso a tu cuenta.</p>

        {message && <div className="change-password-message">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="change-password-input-group">
            <label>Nueva contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              required
            />
          </div>

          <div className="change-password-input-group">
            <label>Confirmar contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite la contraseña"
              required
            />
          </div>

          <button type="submit" className="change-password-button">
            Guardar cambios
          </button>

          <button
            type="button"
            className="change-password-back-button"
            onClick={() => navigate(-1)}
          >
            Volver
          </button>
        </form>
      </section>
    </main>
  );
};