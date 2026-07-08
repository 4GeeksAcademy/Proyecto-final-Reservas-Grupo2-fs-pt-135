import BusinessHeader from "../components/homeBusiness/BusinessHeader";
import BusinessHero from "../components/homeBusiness/BusinessHero";
import BusinessQuickActions from "../components/homeBusiness/BusinessQuickActions";
import BusinessCalendarPreview from "../components/homeBusiness/BusinessCalendarPreview";
import BusinessCalendar from "../components/homeBusiness/BusinessCalendar";
import BusinessTodayReservations from "../components/homeBusiness/BusinessTodayReservations";
import Footer from "../components/Footer";

export default function HomeEmpresa() {
  return (
    <main className="business-home-page">
  <section className="home-hero-wrapper">
    <BusinessHeader />
    <BusinessHero />
  </section>

  <section className="business-home-container">
    <BusinessQuickActions />

    <BusinessCalendar/>
    {/* <BusinessTodayReservations /> */}
    
  </section>

  <Footer />
</main>
  );
}