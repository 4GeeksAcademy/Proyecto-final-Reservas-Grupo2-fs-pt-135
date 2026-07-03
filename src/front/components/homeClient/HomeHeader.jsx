import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/img/bookify-logo.png";

const HomeHeader = () => {
  const [clientName, setClientName] = useState("Cliente");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) return;

    fetch(`${API_URL}/api/client-profile/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.client_profile?.name) {
          setClientName(data.client_profile.name);
        }
      })
      .catch((error) => console.error("Error loading client profile:", error));
  }, [API_URL]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("business_profile_id");
    navigate("/login");
  };

  return (
    <header className="home-header">
      <Link to="/home-client" className="home-header-logo">
        <img src={logo} alt="Bookify logo" />
      </Link>

      <div className="home-header-actions">
        <Link to="/favorites" className="home-header-favorites">
          <i className="bi bi-heart-fill"></i>
          Favoritos
        </Link>

        <div className="home-user-menu">
          <button
            type="button"
            className="home-user-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="home-user-avatar">
              {clientName.charAt(0).toUpperCase()}
            </span>
            <span className="home-user-name">{clientName}</span>
            <i className="bi bi-chevron-down"></i>
          </button>

          {menuOpen && (
            <div className="home-user-dropdown">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/client-profile");
                }}
              >
                <i className="bi bi-person-fill"></i>
                Mi perfil
              </button>

              <button type="button" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right"></i>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;