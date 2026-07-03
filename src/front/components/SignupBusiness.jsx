import { useState } from "react";

export default function SignupForm() {
    const [businessName, setBusinessName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [categoryIds, setCategoryIds] = useState([]);
    const [country, setCountry] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [address, setAddress] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(process.env.BACKEND_URL + "/register/business", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    business_name: businessName,
                    phone,
                    category_ids: categoryIds,
                    country,
                    province,
                    city,
                    postal_code: postalCode,
                    address,
                }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                alert(data.msg || "Error al registrar empresa");
                return;
            }

            alert("Empresa registrada correctamente");
        } catch (error) {
            console.error("Error al registrar empresa:", error);
            alert("Error de conexión con el servidor");
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <input
                type="text"
                placeholder="Nombre de la empresa"
                className="form-control mb-3"
                onChange={(e) => setBusinessName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Teléfono"
                className="form-control mb-3"
                onChange={(e) => setPhone(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                className="form-control mb-3"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="form-control mb-3"
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="text"
                placeholder="País"
                className="form-control mb-3"
                onChange={(e) => setCountry(e.target.value)}
            />
            <input
                type="text"
                placeholder="Provincia"
                className="form-control mb-3"
                onChange={(e) => setProvince(e.target.value)}
            />
            <input
                type="text"
                placeholder="Ciudad"
                className="form-control mb-3"
                onChange={(e) => setCity(e.target.value)}
            />
            <input
                type="text"
                placeholder="Código Postal"
                className="form-control mb-3"
                onChange={(e) => setPostalCode(e.target.value)}
            />
            <input
                type="text"
                placeholder="Dirección"
                className="form-control mb-3"
                onChange={(e) => setAddress(e.target.value)}
            />
            <input
                type="text"
                placeholder="IDs de Categorías (separados por comas)"
                className="form-control mb-3"
                onChange={(e) => setCategoryIds(e.target.value.split(",").map(id => id.trim()))}
            />
            
            <button type="submit" className="btn btn-success w-100">Registrar Empresa</button>
        </form>
    );
}
