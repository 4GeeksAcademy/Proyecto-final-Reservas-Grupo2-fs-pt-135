import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const EmpresaDetalles = () => {
  const { id } = useParams();

  const [empresa, setEmpresa] = useState(null);
  const [services, setServices] = useState([]);
  const [clientProfile, setClientProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const loadBusinessDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/api/business-profile/${id}`);
        const data = await response.json();

        if (!response.ok) {
          setMessage(data.msg || "Empresa no encontrada");
          return;
        }

        setEmpresa(data.business_profile);
      } catch (error) {
        console.error("Error loading business details:", error);
        setMessage("No pudimos cargar los detalles de la empresa.");
      }
    };

    const loadBusinessServices = async () => {
      try {
        const response = await fetch(`${API_URL}/api/services/business/${id}`);
        const data = await response.json();

        setServices(data.services || []);
      } catch (error) {
        console.error("Error loading services:", error);
      }
    };

    const loadClientProfile = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) return;

        const response = await fetch(`${API_URL}/api/client-profile/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setClientProfile(data.client_profile || null);
      } catch (error) {
        console.error("Error loading client profile:", error);
      }
    };

    const loadFavorites = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) return;

        const response = await fetch(`${API_URL}/api/favorites/business`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        const exists = data.favorites?.some(
          (favorite) => favorite.business_id === Number(id)
        );

        setIsFavorite(exists);
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    const loadPage = async () => {
      setLoading(true);
      await Promise.all([
        loadBusinessDetails(),
        loadBusinessServices(),
        loadClientProfile(),
        loadFavorites(),
      ]);
      setLoading(false);
    };

    loadPage();
  }, [API_URL, id]);

  const handleFavorite = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("Debes iniciar sesión para guardar favoritos.");
        return;
      }

      const response = await fetch(`${API_URL}/api/favorites/business/${id}`, {
        method: isFavorite ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.msg || "No se pudo actualizar favoritos.");
        return;
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorite:", error);
      alert("Error de conexión al guardar favorito.");
    }
  };

  const handleReservation = async (serviceId) => {
    try {
      if (!clientProfile?.id) {
        alert("No se encontró el perfil del cliente. Inicia sesión nuevamente.");
        return;
      }

      const response = await fetch(`${API_URL}/api/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientProfile.id,
          service_id: serviceId,
          status: "pendiente",
          notes: "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "No se pudo crear la reserva.");
        return;
      }

      alert("Reserva creada correctamente.");
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert("Error de conexión al crear la reserva.");
    }
  };

  if (loading) {
    return (
      <main className="home-client-page">
        <section className="home-section-container">
          <p className="home-empty-message">Cargando empresa...</p>
        </section>
      </main>
    );
  }

  if (!empresa) {
    return (
      <main className="home-client-page">
        <section className="home-section-container">
          <p className="home-empty-message">{message}</p>
          <Link to="/home-client" className="home-section-link">
            Volver al Home
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="home-client-page">
      <section className="business-detail-hero">
        <div className="business-detail-container">
          <Link to="/home-client" className="business-detail-back">
            <i className="bi bi-arrow-left"></i>
            Volver
          </Link>

          <div className="business-detail-card">
            <div className="business-detail-logo">
              {empresa.logo_url ? (
                <img src={empresa.logo_url} alt={empresa.business_name} />
              ) : (
                <i className="bi bi-building"></i>
              )}
            </div>

            <div className="business-detail-info">
              <span className="business-detail-category">
                {empresa.categories?.[0]?.name || "Servicio"}
              </span>

              <h1>{empresa.business_name}</h1>

              <p className="business-detail-location">
                <i className="bi bi-geo-alt-fill"></i>
                {empresa.address}, {empresa.city}, {empresa.province}
              </p>

              <p className="business-detail-description">
                {empresa.description ||
                  "Esta empresa todavía no ha agregado una descripción a su portafolio."}
              </p>

              <div className="business-detail-actions">
                <button
                  className={`business-detail-secondary-button ${
                    isFavorite ? "active" : ""
                  }`}
                  type="button"
                  onClick={handleFavorite}
                >
                  <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
                  {isFavorite ? "Guardado" : "Guardar"}
                </button>
              </div>
            </div>
          </div>

          <section className="business-services-section">
            <h2 className="home-section-title">Servicios disponibles</h2>

            <div className="business-services-grid">
              {services.length > 0 ? (
                services.map((service) => (
                  <article key={service.id} className="business-service-card">
                    <div>
                      <h3>{service.name}</h3>
                      <p>{service.description || "Servicio disponible para reservar."}</p>
                    </div>

                    <div className="business-service-meta">
                      <span>{service.duration_minutes} min</span>
                      <strong>{service.price} €</strong>
                    </div>

                    <button
                      className="business-detail-primary-button"
                      type="button"
                      onClick={() => setSelectedService(service)}
                    >
                      Reservar
                    </button>
                  </article>
                ))
              ) : (
                <p className="home-empty-message">
                  Esta empresa todavía no tiene servicios publicados.
                </p>
              )}
            </div>
          </section>
        </div>
      </section>
      {selectedService && (
        <div className="reservation-modal-overlay">
          <div className="reservation-modal">
            <h3>Confirmar reserva</h3>

            <p className="reservation-modal-text">
              ¿Deseas reservar este servicio?
            </p>

            <div className="reservation-modal-summary">
              <strong>{selectedService.name}</strong>
              <span>{selectedService.duration_minutes} min</span>
              <span>{selectedService.price} €</span>
            </div>

            <div className="reservation-modal-actions">
              <button
                type="button"
                className="reservation-modal-cancel"
                onClick={() => setSelectedService(null)}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="reservation-modal-confirm"
                onClick={() => {
                  handleReservation(selectedService.id);
                  setSelectedService(null);
                }}
              >
                Confirmar reserva
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default EmpresaDetalles;