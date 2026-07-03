import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/RegisterBusiness.css";

export const RegisterBusiness = () => {
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const [businessName, setBusinessName] = useState("");
    const [phone, setPhone] = useState("");
    const [category, setCategory] = useState("");
    const [otherCategory, setOtherCategory] = useState("");
    const [country, setCountry] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const finalCategory = category === "otros" ? otherCategory : category;

        try {
            const response = await fetch(`${API_URL}/api/auth/register/business`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    business_name: businessName,
                    phone,
                    category: finalCategory,
                    country,
                    province,
                    city,
                    postal_code: postalCode,
                    address,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.msg);
                return;
            }

            alert("Empresa registrada correctamente");
            navigate("/login");

        } catch (error) {
            alert("Error al conectar con el servidor");
        }
    };

    return (
        <div className="register-business-page">

            <div className="register-business-card">

                <span className="register-business-eyebrow">
                    BOOKIFY
                </span>

                <h2>Registrar empresa</h2>

                <p>
                    Crea el perfil de tu negocio y comienza a recibir reservas desde hoy.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="register-business-form"
                >

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
                            required
                        >
                            <option value="">Selecciona una categoría</option>
                            <option value="barberia">Barbería</option>
                            <option value="peluqueria">Peluquería</option>
                            <option value="unas">Uñas</option>
                            <option value="spa">Spa</option>
                            <option value="masajes">Masajes</option>
                            <option value="estetica">Estética</option>
                            <option value="entrenamiento personal">Entrenamiento Personal</option>
                            <option value="fisioterapia">Fisioterapia</option>
                            <option value="tatuajes">Tatuajes</option>
                            <option value="otros">Otros</option>
                        </select>
                    </div>

                    {category === "otros" && (
                        <div className="register-business-input-group">
                            <label>Especifica la categoría</label>
                            <input
                                type="text"
                                className="register-business-input"
                                value={otherCategory}
                                onChange={(event) => setOtherCategory(event.target.value)}
                                placeholder="Escribe la categoría"
                                required
                            />
                        </div>
                    )}

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

                    <button
                        type="submit"
                        className="register-business-button"
                    >
                        Registrar empresa
                    </button>

                </form>

                <p className="register-business-login-text">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login">
                        Inicia sesión
                    </Link>
                </p>

            </div>

        </div>
    );
};