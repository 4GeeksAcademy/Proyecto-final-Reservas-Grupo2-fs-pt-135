import React from "react";

const Navbar = () => {
    return (
        <nav className="navbar">

            <div className="logo">
                ONYX
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
