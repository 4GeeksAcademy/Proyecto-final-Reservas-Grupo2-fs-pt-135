import { useEffect, useState } from "react";

const SearchBar = ({ setCitySearch }) => {
  const [clientName, setClientName] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token || !API_URL) return;

    fetch(`${API_URL}/api/client-profile/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setClientName(data.client_profile?.name || "");
      })
      .catch((error) => {
        console.error("Error loading client profile:", error);
      });
  }, [API_URL]);

  const handleSearch = (event) => {
    event.preventDefault();
    setCitySearch(searchValue.trim());
  };

  return (
    <section className="home-search-section">
      <div className="home-search-content">
        <p className="home-eyebrow">
          {clientName ? `Hola, ${clientName} 👋` : "Hola 👋"}
        </p>

        <h1 className="home-title">
          Encuentra y reserva servicios cerca de ti
        </h1>

        <form className="home-search-box" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar por ciudad: Madrid, Cordoba, Barcelona..."
            className="home-search-input"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />

          <button className="home-search-button" type="submit">
            Buscar
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchBar;