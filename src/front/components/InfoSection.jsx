import React from "react";

import reservaImg from "../assets/img/img/Reserva2.png";
import campanaImg from "../assets/img/img/Campana2.png";
import profesionalImg from "../assets/img/img/Profesional2.png";

const InfoSection = () => {
    return (
        <section id="sobre-nosotros" className="info-section">

            <div className="info-row">

                <div className="info-text">
                    <h2>Reservar nunca fue tan fácil</h2>

                    <p>
                        Encuentra profesionales de confianza en tu zona en cuestión
                        de segundos. Barberías, salones, spa y servicios premium
                        disponibles cuando los necesites.
                    </p>

                    <p>
                        Reserva online las 24 horas del día sin llamadas ni esperas.
                        Gestiona tus citas desde cualquier lugar.
                    </p>
                </div>

                <div className="info-image">
                    <img
                        src={reservaImg}
                        alt="Reserva"
                    />
                </div>

            </div>

            <div className="info-row reverse">

                <div className="info-image">
                    <img
                        src={campanaImg}
                        alt="Recordatorios"
                    />
                </div>

                <div className="info-text">
                    <h2>Nosotros nos encargamos</h2>

                    <p>
                        Recibe recordatorios automáticos para no olvidar ninguna cita.
                    </p>

                    <p>
                        Modifica o cancela reservas fácilmente desde tu perfil
                        sin necesidad de llamar.
                    </p>
                </div>

            </div>

            <div className="info-row">

                <div className="info-text">
                    <h2>Los mejores profesionales</h2>

                    <p>
                        Descubre negocios verificados y consulta opiniones reales
                        de otros clientes.
                    </p>

                    <p>
                        Compara servicios, valoraciones y disponibilidad antes
                        de reservar.
                    </p>
                </div>

                <div className="info-image">
                    <img
                        src={profesionalImg}
                        alt="Profesionales"
                    />
                </div>

            </div>

        </section>
    );
};

export default InfoSection;