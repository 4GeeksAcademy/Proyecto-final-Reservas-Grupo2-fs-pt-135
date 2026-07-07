import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        // Aquí podemos agregar la lógica para manejar el inicio de sesión
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                alert(data.msg || "Error al iniciar sesión");
                return;
            }

            // Guardar token
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirección segun rol
            if (data.user.role === "client") {
                navigate("/home-cliente");
            } else if (data.user.role === "business") {
                navigate("/home-business");
            } else {
                alert("Rol de usuario desconocido");
            }

        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Error de conexión con el servidor");
        }
    };


    return (
        <form onSubmit={handleLogin}>

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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary w-100">Login</button>
        </form>
    );
}