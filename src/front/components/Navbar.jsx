import React from "react";

const Navbar = ({ setShowModal }) => {
    return (
        <nav className="navbar">

            <div className="logo cobre-metalizado">
                ONYX
            </div>

            <ul className="nav-links">
                <li><a href="#">Explorar</a></li>
                <li><a href="#">Profesionales</a></li>
                <li><a href="#">Sobre Nosotros</a></li>
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

            <button className="btn-nav">
                Reservar
            </button>

        </nav>
    );
};

export default Navbar;