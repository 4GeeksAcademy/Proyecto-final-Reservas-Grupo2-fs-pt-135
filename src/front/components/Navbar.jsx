import React from "react";
import logo from "../assets/img/img/bookify-logo.png";

const Navbar = ({ setShowModal }) => {
    return (
        <nav className="navbar">

            <div className="logo">
                <img src={logo} alt="Bookify" className="logo-img" />
            
            </div>

            <ul className="nav-links">
                <li><a href="#">Explorar</a></li>
                <li><a href="#">Profesionales</a></li>
                <li><a href="#">Sobre Nosotros</a></li>
                <li><a href="/profile">Perfil</a></li>
                <li>
                    <a
                        className="registro-usuario"
                        onClick={() => setShowModal(true)}
                        style={{ cursor: "pointer" }}
                    >
                        Registro usuario
                    </a>
                </li>
            </ul>

            <button className="btn-nav" onClick={() => setShowModal(true)}>
                Reservar
            </button>

        </nav>
    );
};

export default Navbar;