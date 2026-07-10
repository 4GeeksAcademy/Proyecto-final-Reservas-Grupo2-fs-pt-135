import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/img/bookify-logo.png";

const BusinessHeader = () => {
  const [businessName, setBusinessName] = useState("Empresa");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) return;

    fetch(`${API_URL}/api/business-profile/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.business_profile?.business_name) {
          setBusinessName(data.business_profile.business_name);
        }
      })
      .catch((error) => console.error("Error loading business profile:", error));
  }, [API_URL]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("business_profile_id");
    navigate("/login");
  };

  return (
    <header className="home-header">
      <Link to="/home-business" className="home-header-logo">
        <img src={logo} alt="Bookify logo" />
      </Link>

      <div className="home-header-actions">
        <div className="home-user-menu">
          <button
            type="button"
            className="home-user-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="home-user-avatar">
              {businessName.charAt(0).toUpperCase()}
            </span>

            <span className="home-user-name">{businessName}</span>

            <i className="bi bi-chevron-down"></i>
          </button>

          {menuOpen && (
            <div className="home-user-dropdown">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/business/portfolio");
                }}
              >
                <i className="bi bi-person-fill"></i>
                Mi perfil
              </button>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/change-password");
                }}
              >
                <i className="bi bi-shield-lock-fill"></i>
                Cambiar contraseña
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

export default BusinessHeader;