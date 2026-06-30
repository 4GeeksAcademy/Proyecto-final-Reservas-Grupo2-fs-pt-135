import React from "react";
import logo from "../assets/img/img/bookify-logo.png";

const Footer = () => {
  return (
    <footer className="footer">

      <img src={logo} alt="Bookify" className="footer-logo"/>

      <p className="footer-description">
        Reserva servicios de confianza de forma rápida, sencilla y segura.
      </p>

      <p className="footer-copy">
        © 2026 Bookify. Todos los derechos reservados.
      </p>

    </footer>
  );
};

export default Footer;
