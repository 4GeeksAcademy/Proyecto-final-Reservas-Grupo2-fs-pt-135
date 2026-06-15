import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow p-4" style={{ maxWidth: "600px", width: "100%" }}>

                <h2 className="text-center mb-4">Registrar empresa</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">Nombre del negocio</label>
                        <input type="text" className="form-control" value={businessName} onChange={(event) => setBusinessName(event.target.value)} placeholder="Ej: Barbería Premium" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Teléfono</label>
                        <input type="text" className="form-control" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Teléfono del negocio" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Categoría</label>
                        <select className="form-select" value={category} onChange={(event) => setCategory(event.target.value)}>
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
                        <div className="mb-3">
                            <label className="form-label">Especifica la categoría</label>
                            <input type="text" className="form-control" value={otherCategory} onChange={(event) => setOtherCategory(event.target.value)} placeholder="Escribe la categoría" />
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="form-label">País</label>
                        <input type="text" className="form-control" value={country} onChange={(event) => setCountry(event.target.value)} placeholder="País" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Provincia</label>
                        <input type="text" className="form-control" value={province} onChange={(event) => setProvince(event.target.value)} placeholder="Provincia" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Ciudad</label>
                        <input type="text" className="form-control" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Ciudad" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Código postal</label>
                        <input type="text" className="form-control" value={postalCode} onChange={(event) => setPostalCode(event.target.value)} placeholder="Código postal" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Dirección</label>
                        <input type="text" className="form-control" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Dirección del negocio" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Correo electrónico</label>
                        <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="empresa@email.com" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Mínimo 8 caracteres" />
                    </div>

                    <button type="submit" className="btn btn-success w-100">Registrar empresa</button>

                </form>

                <p className="text-center mt-3 mb-0">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>

            </div>
        </div>
    );
};