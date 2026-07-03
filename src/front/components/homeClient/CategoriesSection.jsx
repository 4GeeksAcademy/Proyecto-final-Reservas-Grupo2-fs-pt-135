import { useEffect, useState } from "react";

const categoryIcons = {
  "Peluquería": "bi-scissors",
  "Spa": "bi-flower1",
  "Salud y bienestar": "bi-heart-pulse-fill",
  "Legal": "bi-bank",
  "Eventos": "bi-calendar-event",
  "Finanzas": "bi-cash-coin",
  "Naturaleza": "bi-tree-fill",
};

const CategoriesSection = ({ selectedCategoryId, setSelectedCategoryId }) => {
  const [categories, setCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then((response) => response.json())
      .then((data) => {
        const categoriesList = Array.isArray(data) ? data : data.categories || [];
        setCategories(categoriesList);
      })
      .catch((error) => console.error("Error loading categories:", error));
  }, [API_URL]);

  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, 3);

  return (
    <section className="home-section-container">
      <h2 className="home-section-title">Categorías populares</h2>

      <div className="home-categories-grid">
        {visibleCategories.map((category) => (
          <button
            key={category.id}
            className={`home-category-card ${selectedCategoryId === category.id ? "active" : ""
              }`}
            onClick={() => setSelectedCategoryId(category.id)}
          >
            <i className={`bi ${categoryIcons[category.name] || "bi-tag-fill"}`}></i>
            <span>{category.name}</span>
          </button>
        ))}

        <button
          className={`home-category-card home-category-card-small ${selectedCategoryId === "" ? "active" : ""
            }`}
          onClick={() => {
            setSelectedCategoryId("");
            setShowAllCategories(!showAllCategories);
          }}
        >
          <i className="bi bi-grid-fill"></i>
          <span>{showAllCategories ? "Menos" : "Todas"}</span>
        </button>
      </div>
    </section>
  );
};

export default CategoriesSection;