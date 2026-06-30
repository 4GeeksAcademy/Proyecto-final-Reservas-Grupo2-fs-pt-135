import React from "react";
import logo from "../assets/img/img/bookify-logo.png";

const Navbar = () => {
    return (
        <nav className="navbar">

            <div className="logo">
                <img src={logo} alt="Bookify" className="logo-img" />
            </div>

            <ul className="nav-links">
                <li><a href="#">Explorar</a></li>
                <li><a href="#">Profesionales</a></li>
                <li><a href="#">Sobre Nosotros</a></li>
            </ul>

            <button className="btn-nav">
                AGENDAR CITA
            </button>

        </nav>
    );
};

export default Navbar;
