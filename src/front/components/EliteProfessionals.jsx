import React from "react";
import barberiaImage from "../assets/img/logosdeempresa/barberia -el -barrio.jpg";
import fluxImage from "../assets/img/logosdeempresa/fluxcapital.png";
import bionaturaImage from "../assets/img/logosdeempresa/bionaturaspa.png";

const professionals = [
    {
        name: "Barberia El Barrio",
        specialty: "Barberia Tradicional",
        rating: "4.9",
        image: barberiaImage
    },
    {
        name: "Flux Capital",
        specialty: "Finanzas de Elite",
        rating: "5.0",
        image: fluxImage
    },
    {
        name: "Bionatura Spa",
        specialty: "Spa & Wellness",
        rating: "4.8",
        image: bionaturaImage
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