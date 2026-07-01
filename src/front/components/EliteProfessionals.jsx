import React from "react";

const professionals = [
    {
        name: "Miguel Barber",
        specialty: "Barberia Premium",
        rating: "4.9",
        image: "src/front/assets/img/img/barberia.jpeg"
    },
    {
        name: "Flux Capital",
        specialty: "Finanzas de Elite",
        rating: "5.0",
        image: "src/front/assets/img/img/financiera.webp"
    },
    {
        name: "Bionatura Spa",
        specialty: "Spa & Wellness",
        rating: "4.8",
        image: "src/front/assets/img/img/Spa.jpg"
    }
];

const EliteProfessionals = () => {
    return (
        <section className="elite-section">

            <h2 className="section-title">
                Locales Destacados
            </h2>

            <div className="elite-grid">

                {professionals.map((pro, index) => (
                    <div
                        key={index}
                        className="elite-card"
                    >

                        <img
                            src={pro.image}
                            alt={pro.name}
                            className="professional-image"
                        />

                        <h3>{pro.name}</h3>

                        <p>{pro.specialty}</p>

                        <span>⭐ {pro.rating}</span>

                    </div>
                ))}

            </div>

        </section>
    );
};

export default EliteProfessionals;