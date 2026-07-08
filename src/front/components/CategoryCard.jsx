import React from "react";

import {
  FaStore,
  FaCut,
  FaSpa,
  FaHeartbeat,
  FaBalanceScale,
  FaMoneyBillWave,
  FaLeaf,
  FaPlus
} from "react-icons/fa";

export const CategorySection = ({ setShowModal }) => {

  const categorias = [
    {
      nombre: "Eventos",
      icono: <FaStore />
    },
    {
      nombre: "Spa",
      icono: <FaSpa />
    },
    {
      nombre: "Salud y Bienestar",
      icono: <FaHeartbeat />
    },
    {
      nombre: "Legal",
      icono: <FaBalanceScale />
    },
    {
      nombre: "Finanzas",
      icono: <FaMoneyBillWave />
    },
    {
      nombre: "Naturaleza",
      icono: <FaLeaf />
    },
    {
      nombre: "Peluquerías",
      icono: <FaCut />
    },
    {
      nombre: "Más",
      icono: <FaPlus />
    }
  ];

  return (
    <section className="category-section">

      <h2 className="section-title">
        Categorías Populares
      </h2>

      <div className="category-grid">

        {categorias.map((categoria, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() => setShowModal(true)}
            style={{ cursor: "pointer" }}
          >

            <div className="category-icon">
              {categoria.icono}
            </div>

            <h3>{categoria.nombre}</h3>

          </div>
        ))}

      </div>

    </section>
  );
};