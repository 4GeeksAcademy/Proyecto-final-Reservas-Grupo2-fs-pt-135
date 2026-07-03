import { useState } from "react";

export default function SignupForm() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(process.env.BACKEND_URL + "/register/client", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone, email, password }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                alert(data.msg || "Error al registrar usuario");
                return;
            }

            alert("Usuario registrado correctamente");
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            alert("Error de conexión con el servidor");
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <input
                type="text"
                placeholder="Nombre"
                className="form-control mb-3"
                onChange={(e) => setName(e.target.value)}
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

            <button className="btn btn-success w-100">Registrarse</button>
        </form>

    );
}