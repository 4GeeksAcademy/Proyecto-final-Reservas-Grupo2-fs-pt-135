import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";

export const Search = () => {
    const [servicio, setServicio] = useState("");
    const [fecha,setFecha] = useState("");
    const [ubicacion,setUbicacion] = useState("");
    const navigate = useNavigate();
    const handleSearch = async () => {
        if(!(servicio && fecha && ubicacion)) {
            alert("Por favor, completa todos los campos de búsqueda.");
            return; 
        }

        try {
            const response = await fetch(
                `${process.env.BACKEND_URL}/api/search?servicio=${servicio}&fecha=${fecha}&ubicacion=${ubicacion}`
            );
            const data = await response.json();
            navigate("/resultados",{
                state: { resultados: data }

});
        } catch (error) {
            console.error("Error al realizar la búsqueda:", error);
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder=" Buscar servicios..."
                value={servicio}
                onChange={(e) => setServicio(e.target.value)}
            />
            <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
            />
            <input
                type="text"
                placeholder=" Ubicación"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
            />
            <button onClick={handleSearch}>
            Buscar
            </button>
        </div>
    );
};

export default Search;