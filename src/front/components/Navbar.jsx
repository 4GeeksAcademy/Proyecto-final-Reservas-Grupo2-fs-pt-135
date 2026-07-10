import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/img/bookify-logo.png";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">

            <div
                className="logo"
                onClick={() => window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })}
                style={{ cursor: "pointer" }}
            >
                <img src={logo} alt="Bookify" className="logo-img" />
            </div>

            <ul className="nav-links">
                <li><a href="#categorias">Explorar</a></li>
                <li><a href="#profesionales">Profesionales</a></li>
                <li><a href="#sobre-nosotros">Sobre Nosotros</a></li>
            </ul>

            <button
                className="btn-nav"
                onClick={() => navigate("/login")}
            >
                Reservar
            </button>

        </nav>
    );
};

export default Navbar;