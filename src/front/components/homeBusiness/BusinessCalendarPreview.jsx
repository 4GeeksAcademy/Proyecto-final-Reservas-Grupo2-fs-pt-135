export default function BusinessCalendarPreview() {
  const weekDays = ["L", "M", "X", "J", "V", "S", "D"];
  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  return (
    <section className="business-calendar-section">
      <div className="business-calendar-header">
        <div>
          <p className="business-home-eyebrow">Calendario</p>
          <h2>Julio 2026</h2>
        </div>

        <button
          type="button"
          className="business-calendar-button"
        >
          Vista mensual
        </button>
      </div>

      <div className="business-calendar-card">
        <div className="business-calendar-weekdays">
          {weekDays.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className="business-calendar-grid">
          {days.map((day) => (
            <button
              key={day}
              type="button"
              className={
                day === 12 || day === 18 || day === 25
                  ? "business-calendar-day active"
                  : "business-calendar-day"
              }
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}