import { useState } from "react";

import HomeHeader from "../components/homeClient/HomeHeader";
import SearchBar from "../components/homeClient/SearchBar";
import CategoriesSection from "../components/homeClient/CategoriesSection";
import ReservationsSection from "../components/homeClient/ReservationsSection";
import NearbyBusinessesSection from "../components/homeClient/NearbyBusinessesSection";
import Footer from "../components/Footer";

const HomeClient = () => {

  /* ===========================================================
     HOME CLIENT - GLOBAL STATE

     citySearch:
     Guarda la ciudad escrita por el usuario en el buscador.
     Se utiliza para buscar empresas por ciudad.

     selectedCategoryId:
     Guarda la categoría seleccionada (Peluquería, Spa, etc.).
     Se utiliza para filtrar las empresas obtenidas desde el backend.
  =========================================================== */

  const [citySearch, setCitySearch] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  return (
    <main className="home-client-page">

      {/* ===========================================================
          HOME CLIENT - HEADER
          Logo + acceso a Favoritos.
      =========================================================== */}
      <section className="home-hero-wrapper">
        <HomeHeader />

        <SearchBar setCitySearch={setCitySearch} />
      </section>
      {/* ===========================================================
          HOME CLIENT - CATEGORIES
          Muestra las categorías disponibles desde el backend.
          Al seleccionar una categoría se actualiza
          "selectedCategoryId".
      =========================================================== */}
      <CategoriesSection
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />

      {/* ===========================================================
          HOME CLIENT - ACTIVE RESERVATIONS
          Próximas reservas del cliente.
          (Pendiente de conectar con el endpoint de reservas).
      =========================================================== */}
      <ReservationsSection />

      {/* ===========================================================
          HOME CLIENT - NEARBY BUSINESSES
          Muestra empresas filtradas utilizando:
          - Ciudad (citySearch)
          - Categoría (selectedCategoryId)

          La búsqueda se realiza mediante el backend:
          GET /api/business-profile/search
      =========================================================== */}
      <NearbyBusinessesSection
        citySearch={citySearch}
        selectedCategoryId={selectedCategoryId}
      />

      <Footer />

    </main>
  );
};

export default HomeClient;