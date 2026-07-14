import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/RegisterBusiness.css";

export const RegisterBusiness = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/api/categories/`);
        const data = await response.json();

        if (!response.ok) {
          console.error(
            data.msg || "No fue posible cargar las categorías."
          );
          return;
        }

        const categoriesList = Array.isArray(data)
          ? data
          : data.categories || [];

        setCategories(categoriesList);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, [API_URL]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!category) {
      alert("Selecciona una categoría.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/register/business`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.msg);
        return;
      }

      alert(
        "Empresa registrada correctamente. Ahora inicia sesión para configurar tu negocio."
      );
      navigate("/login");
    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="register-business-page">
      <div className="register-business-card">
        <span className="register-business-eyebrow">BOOKIFY</span>

        <h2>Registrar empresa</h2>

        <p>
          Crea el perfil de tu negocio y comienza a recibir reservas desde hoy.
        </p>

        <form onSubmit={handleSubmit} className="register-business-form">
          <div className="register-business-input-group">
            <label>Nombre del negocio</label>
            <input
              type="text"
              className="register-business-input"
              value={businessName}
              onChange={(event) => setBusinessName(event.target.value)}
              placeholder="Ej: Barbería Premium"
              required
            />
          </div>

          <div className="register-business-input-group">
            <label>Teléfono</label>
            <input
              type="text"
              className="register-business-input"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Teléfono del negocio"
              required
            />
          </div>

          <div className="register-business-input-group">
            <label>Categoría</label>
            <select
              className="register-business-input"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              disabled={loadingCategories}
              required
            >
              <option value="">
                {loadingCategories
                  ? "Cargando categorías..."
                  : "Selecciona una categoría"}
              </option>

              {categories.map((categoryItem) => (
                <option
                  key={categoryItem.id}
                  value={categoryItem.id}
                >
                  {categoryItem.name}
                </option>
              ))}
            </select>
          </div>

          <div className="register-business-input-group">
            <label>País</label>
            <input
              type="text"
              className="register-business-input"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              placeholder="País"
              required
            />
          </div>

          <div className="register-business-input-group">
            <label>Provincia</label>
            <input
              type="text"
              className="register-business-input"
              value={province}
              onChange={(event) => setProvince(event.target.value)}
              placeholder="Provincia"
              required
            />
          </div>

          <div className="register-business-input-group">
            <label>Ciudad</label>
            <input
              type="text"
              className="register-business-input"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="Ciudad"
              required
            />
          </div>

          <div className="register-business-input-group">
            <label>Código postal</label>
            <input
              type="text"
              className="register-business-input"
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
              placeholder="Código postal"
              required
            />
          </div>

          <div className="register-business-input-group">
            <label>Dirección</label>
            <input
              type="text"
              className="register-business-input"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Dirección del negocio"
              required
            />
          </div>

          <div className="register-business-input-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              className="register-business-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="empresa@email.com"
              required
            />
          </div>

          <div className="register-business-input-group">
            <label>Contraseña</label>
            <input
              type="password"
              className="register-business-input"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Mínimo 8 caracteres"
              required
            />
          </div>

          <button type="submit" className="register-business-button">
            Registrar empresa
          </button>
        </form>

        <p className="register-business-login-text">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};