import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import HomeHeader from "../components/homeClient/HomeHeader";

const ClientProfile = () => {
  const [clientProfile, setClientProfile] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    Promise.all([
      fetch(`${API_URL}/api/client-profile/me`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),

      fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),
    ])
      .then(([profileData, authData]) => {
        setClientProfile(profileData.client_profile);
        setUserData(authData.user || authData);
      })
      .catch((error) => console.error("Error loading profile:", error))
      .finally(() => setLoading(false));
  }, [API_URL, navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("business_profile_id");
    navigate("/login");
  };

  if (loading) {
    return (
      <>
        <HomeHeader />
        <main className="client-profile-page">
          <p>Cargando perfil...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <HomeHeader />

      <main className="client-profile-page">
        <section className="client-profile-card">
          <div className="client-profile-avatar">
            {clientProfile?.name?.charAt(0).toUpperCase() || "C"}
          </div>

          <h1>Mi perfil</h1>
          <p className="client-profile-subtitle">
            Información de tu cuenta de cliente
          </p>

          <div className="client-profile-info">
            <div>
              <span>Nombre</span>
              <strong>{clientProfile?.name || "No disponible"}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{userData?.email || "No disponible"}</strong>
            </div>

            <div>
              <span>Teléfono</span>
              <strong>{clientProfile?.phone || "No disponible"}</strong>
            </div>
          </div>

          <div className="client-profile-actions">
            <Link to="/home-client" className="client-profile-btn secondary">
              Volver al home
            </Link>

            <button onClick={handleLogout} className="client-profile-btn danger">
              Cerrar sesión
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ClientProfile;