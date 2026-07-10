import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterBusiness.css";

export const BusinessProfile = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadBusinessProfile = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/api/business-profile/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.msg || "No fue posible cargar el perfil.");
        return;
      }

      const profile = data.business_profile;

      setBusinessName(profile.business_name || "");
      setPhone(profile.phone || "");
      setCategory(profile.categories?.[0]?.id || "");
      setCountry(profile.country || "");
      setProvince(profile.province || "");
      setCity(profile.city || "");
      setPostalCode(profile.postal_code || "");
      setAddress(profile.address || "");
    } catch (error) {
      console.error("Error loading business profile:", error);
      alert("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBusinessProfile();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);

      const token = sessionStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/api/business-profile/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          business_name: businessName,
          phone,
          category_ids: [Number(category)],
          country,
          province,
          city,
          postal_code: postalCode,
          address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.msg || "No fue posible actualizar el perfil.");
        return;
      }

      alert("Perfil actualizado correctamente.");

      await loadBusinessProfile();
    } catch (error) {
      console.error("Error updating business profile:", error);
      alert("Error al conectar con el servidor.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="register-business-page">
        <div className="register-business-card">
          <h3>Cargando perfil...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="register-business-page">
      <div className="register-business-card">
        <button
          type="button"
          className="business-profile-back"
          onClick={() => navigate("/home-business")}
        >
          <i className="bi bi-arrow-left"></i>
          Volver al panel
        </button>

        <span className="register-business-eyebrow">BOOKIFY</span>

        <h2>Perfil de empresa</h2>

        <p>Actualiza la información principal de tu negocio.</p>

        <form onSubmit={handleSubmit} className="register-business-form">
          <div className="register-business-input-group">
            <label>Nombre del negocio</label>

            <input
              className="register-business-input"
              type="text"
              value={businessName}
              onChange={(event) => setBusinessName(event.target.value)}
              required
            />
          </div>

          <div className="register-business-input-group">
            <label>Teléfono</label>

            <input
              className="register-business-input"
              type="text"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
            />
          </div>

          <div className="register-business-input-group">
            <label>Categoría</label>

            <select
              className="register-business-input"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value="1">Peluquería</option>
              <option value="2">Spa</option>
              <option value="3">Salud y bienestar</option>
              <option value="4">Naturaleza</option>
              <option value="5">Eventos</option>
              <option value="6">Legal</option>
            </select>
          </div>

          <div className="register-business-input-group">
            <label>País</label>

            <input
              className="register-business-input"
              type="text"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              required
            />
          </div>

          <div className="register-business-input-group">
            <label>Provincia</label>

            <input
              className="register-business-input"
              type="text"
              value={province}
              onChange={(event) => setProvince(event.target.value)}
              required
            />
          </div>

          <div className="register-business-input-group">
            <label>Ciudad</label>

            <input
              className="register-business-input"
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              required
            />
          </div>

          <div className="register-business-input-group">
            <label>Código postal</label>

            <input
              className="register-business-input"
              type="text"
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
              required
            />
          </div>

          <div className="register-business-input-group">
            <label>Dirección</label>

            <input
              className="register-business-input"
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
            />
          </div>

          <button
            className="register-business-button"
            type="submit"
            disabled={saving}
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </div>
    </div>
  );
};