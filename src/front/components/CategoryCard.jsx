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

export const CategorySection = () => {

  const categorias = [
    {
      nombre: "Salones",
      icono: <FaStore />
    },
    {
      nombre: "Spa",
      icono: <FaSpa />
    },
    {
      nombre: "Salud",
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
      nombre: "Bienestar",
      icono: <FaLeaf />
    },
    {
      nombre: "Corte",
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