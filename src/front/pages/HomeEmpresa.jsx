import BusinessHeader from "../components/homeBusiness/BusinessHeader";
import BusinessHero from "../components/homeBusiness/BusinessHero";
import BusinessQuickActions from "../components/homeBusiness/BusinessQuickActions";
import BusinessCalendarPreview from "../components/homeBusiness/BusinessCalendarPreview";
import BusinessTodayReservations from "../components/homeBusiness/BusinessTodayReservations";
import Footer from "../components/Footer";

export default function HomeEmpresa() {
  return (
    <main className="business-home-page">
  <BusinessHeader />

  <BusinessHero />

  <section className="business-home-container">
    <BusinessQuickActions />

    <BusinessCalendarPreview />

    <BusinessTodayReservations />
  </section>

  <Footer />
</main>
  );
}