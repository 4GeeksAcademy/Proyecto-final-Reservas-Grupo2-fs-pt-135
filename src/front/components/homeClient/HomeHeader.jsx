import { Link } from "react-router-dom";
import logo from "../../assets/img/img/bookify-logo.png";

const HomeHeader = () => {
  return (
    <header className="home-header">
      <Link to="/home-client" className="home-header-logo">
        <img src={logo} alt="Bookify logo" />
      </Link>

      <Link to="/favorites" className="home-header-favorites">
        <i className="bi bi-heart-fill"></i>
        Favoritos
      </Link>
    </header>
  );
};

export default HomeHeader;