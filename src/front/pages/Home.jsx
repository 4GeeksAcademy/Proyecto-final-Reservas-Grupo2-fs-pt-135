import React from "react";
import { Hero } from "../components/Hero";
import { Features } from "../components/Feature";
import { FacilityCard } from "../components/FacilityCard";
import "../components/FacilityCard.css";
import foto1 from "../assets/img/Gimnasio.jpg"
import foto2 from "../assets/img/piscina.jpg"
import foto3 from "../assets/img/pista de tenis.jpg"
import foto4 from "../assets/img/campo de futbol.jpg"
import foto5 from "../assets/img/padel.jpg"
import foto6 from "../assets/img/baloncesto.webp"
export const Home = () => {
	return (
		<>
			<Hero />
			<div className="container my-5">
				<Features />
				<div className="row mt-5">
					<div className="col-md-4 mb-4">
						<FacilityCard title="Gimnasio PowerFit"
							description="Equipado con máquinas de última generación y entrenadores certificados. Abierto de 6:00 a 23:00."
							imageUrl={foto1} />
					</div>
					<div className="col-md-4 mb-4">
						<FacilityCard title="Piscina AquaSplash"
							description="Piscina olímpica cubierta con clases de natación y horarios flexibles. Abierta de 7:00 a 22:00."
							imageUrl={foto2} />
					</div>
					<div className="col-md-4 mb-4">
						<FacilityCard title="Pista de Tenis GreenCourt"
							description="Pista de tenis al aire libre con iluminación nocturna. Disponible para reservas de 8:00 a 20:00."
							imageUrl={foto3} />
					</div>
					<div className="col-md-4 mb-4">
						<FacilityCard title="Campo de Fútbol ArenaSport"
							description="Campo de fútbol de césped natural con vestuarios y iluminación nocturna. Disponible para reservas de 9:00 a 21:00."
							imageUrl={foto4} />
					</div>
					<div className="col-md-4 mb-4">
						<FacilityCard title="Pista de Pádel Central"
							description="Instalación de césped artificial con iluminación LED de alta calidad. Disponible de 8:00 a 22:00."
							imageUrl={foto5} />
					</div>
					<div className="col-md-4 mb-4">
						<FacilityCard title="Cancha de Baloncesto HoopZone"
							description="Cancha de baloncesto al aire libre con tableros profesionales y horarios flexibles. Abierta de 7:00 a 21:00."
							imageUrl={foto6} />
					</div>
				</div>
			</div>
		</>
	);
};
