import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NearbyBusinessesSection = ({ citySearch, selectedCategoryId }) => {
  const [businesses, setBusinesses] = useState([]);
  const [favoriteBusinessIds, setFavoriteBusinessIds] = useState([]);
  const [city, setCity] = useState("");
  const [statusMessage, setStatusMessage] = useState("Detectando tu ubicación...");

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const normalizeCity = (cityName) => {
    return cityName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  };

  const loadFavoriteBusinesses = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) return;

      const response = await fetch(`${API_URL}/api/favorites/business`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error loading favorites:", data);
        return;
      }

      const ids = data.favorites?.map((favorite) => favorite.business_id) || [];
      setFavoriteBusinessIds(ids);
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const toggleFavoriteBusiness = async (businessId) => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("Debes iniciar sesión para guardar favoritos.");
        return;
      }

      const isFavorite = favoriteBusinessIds.includes(businessId);

      const response = await fetch(`${API_URL}/api/favorites/business/${businessId}`, {
        method: isFavorite ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error updating favorite:", data);
        alert(data.msg || "No se pudo actualizar favoritos.");
        return;
      }

      setFavoriteBusinessIds((prev) =>
        isFavorite
          ? prev.filter((id) => id !== businessId)
          : [...new Set([...prev, businessId])]
      );
    } catch (error) {
      console.error("Error updating favorite:", error);
      alert("Error de conexión al actualizar favoritos.");
    }
  };

  const searchBusinessesByCity = async (cityName) => {
    try {
      const cleanCity = normalizeCity(cityName);

      setCity(cleanCity);
      setStatusMessage(`Buscando empresas en ${cleanCity}...`);

      let url = `${API_URL}/api/business-profile/search?city=${encodeURIComponent(cleanCity)}`;

      if (selectedCategoryId) {
        url += `&category_id=${selectedCategoryId}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      setBusinesses(data);

      if (data.length === 0) {
        setStatusMessage(`No encontramos empresas en ${cleanCity}.`);
      } else {
        setStatusMessage("");
      }
    } catch (error) {
      console.error("Error loading businesses:", error);
      setStatusMessage("No pudimos cargar las empresas.");
    }
  };

  const getCityFromCoordinates = async (latitude, longitude) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );

    const data = await response.json();

    return (
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.municipality ||
      ""
    );
  };

  useEffect(() => {
    if (!API_URL) return;
    loadFavoriteBusinesses();
  }, [API_URL]);

  useEffect(() => {
    if (!API_URL) return;

    if (citySearch) {
      searchBusinessesByCity(citySearch);
      return;
    }

    if (!navigator.geolocation) {
      setStatusMessage("Tu navegador no permite usar ubicación. Busca una ciudad manualmente.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const detectedCity = await getCityFromCoordinates(latitude, longitude);

          if (!detectedCity) {
            setStatusMessage("No pudimos detectar tu ciudad. Busca una ciudad manualmente.");
            return;
          }

          searchBusinessesByCity(detectedCity);
        } catch (error) {
          console.error("Error detecting city:", error);
          setStatusMessage("No pudimos detectar tu ubicación. Busca una ciudad manualmente.");
        }
      },
      () => {
        setStatusMessage("Permiso de ubicación denegado. Busca una ciudad manualmente.");
      }
    );
  }, [citySearch, selectedCategoryId, API_URL]);

  return (
    <section className="nearby-businesses-section">
      <div className="home-section-container">
        <h2 className="home-section-title">
          Empresas disponibles
          {city && <span> en {city}</span>}
        </h2>

        {statusMessage && <p className="home-empty-message">{statusMessage}</p>}

        <div className="nearby-businesses-grid">
          {businesses.map((business) => {
            const isFavorite = favoriteBusinessIds.includes(business.id);

            return (
              <article key={business.id} className="nearby-business-card">
                <button
                  className={`nearby-favorite-button ${isFavorite ? "active" : ""}`}
                  type="button"
                  onClick={() => toggleFavoriteBusiness(business.id)}
                >
                  <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
                </button>

                <div className="nearby-business-logo">
                  {business.logo_url ? (
                    <img src={business.logo_url} alt={business.business_name} />
                  ) : (
                    <i className="bi bi-building"></i>
                  )}
                </div>

                <div className="nearby-business-info">
                  <span className="nearby-business-badge">
                    {business.categories?.[0]?.name || "Servicio"}
                  </span>

                  <h3>{business.business_name}</h3>

                  <p className="nearby-business-description">
                    {business.description || "Empresa disponible para reservas en Bookify."}
                  </p>

                  <p className="nearby-business-location">
                    <i className="bi bi-geo-alt-fill"></i>
                    {business.city}, {business.province}
                  </p>
                </div>

                <Link
                  to={`/empresa/${business.id}`}
                  className="nearby-business-button text-center text-decoration-none"
                >
                  Ver detalles
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NearbyBusinessesSection;