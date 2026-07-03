import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeHeader from "../components/homeClient/HomeHeader";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState("Cargando favoritos...");

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const loadFavorites = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        setMessage("Debes iniciar sesión para ver tus favoritos.");
        return;
      }

      const response = await fetch(`${API_URL}/api/favorites/business`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setFavorites(data.favorites || []);
      setMessage("");
    } catch (error) {
      console.error("Error loading favorites:", error);
      setMessage("No pudimos cargar tus favoritos.");
    }
  };

  const removeFavorite = async (businessId) => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        setMessage("Debes iniciar sesión para modificar tus favoritos.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/favorites/business/${businessId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.msg || "No se pudo eliminar el favorito.");
        return;
      }

      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.business_id !== businessId)
      );

      setMessage("Empresa eliminada de favoritos.");
    } catch (error) {
      console.error("Error removing favorite:", error);
      setMessage("Error de conexión al eliminar favorito.");
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [API_URL]);

  return (
    <main className="home-client-page">
      <HomeHeader />

      <section className="home-section-container">
        <h1 className="home-section-title">
          Mis favoritos <span>guardados</span>
        </h1>

        {message && <p className="home-empty-message">{message}</p>}

        <div className="nearby-businesses-grid">
          {favorites.map((favorite) => (
            <article key={favorite.id} className="nearby-business-card">
              <div className="nearby-business-logo">
                <i className="bi bi-heart-fill"></i>
              </div>

              <h3>{favorite.business?.business_name || "Empresa favorita"}</h3>

              <p className="nearby-business-category">
                {favorite.business?.city || "Ciudad no disponible"}
              </p>

              <div className="favorite-card-actions">
                <Link
                  to={`/empresa/${favorite.business_id}`}
                  className="nearby-business-button text-center text-decoration-none"
                >
                  Ver detalles
                </Link>

                <button
                  className="favorite-remove-button"
                  type="button"
                  onClick={() => removeFavorite(favorite.business_id)}
                >
                  Quitar
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Favorites;