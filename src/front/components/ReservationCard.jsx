import React from "react";

export const ReservationCard = ({
    reservationId,
    businessName,
    service,
    date,
    time,
    price,
    image,
    status,
    onClick
}) => {

    return (

        <div
            className="reservation-card"
            onClick={() => onClick(reservationId)}
        >

            <div className="row align-items-center g-4">

                {/* Imagen */}

                <div className="col-lg-2 col-md-3 col-12 text-center">

                    <img
                        src={image}
                        alt={businessName}
                        className="reservation-image"
                    />

                </div>

                {/* Información */}

                <div className="col-lg-7 col-md-6 col-12">

                    <h4 className="reservation-business">
                        {businessName}
                    </h4>

                    <p className="reservation-service">
                        {service}
                    </p>

                    <div className="reservation-info">

                        <span>
                            <i className="fa-regular fa-calendar"></i>
                            {date}
                        </span>

                        <span>
                            <i className="fa-regular fa-clock"></i>
                            {time}
                        </span>

                        <span>
                            <i className="fa-solid fa-tag"></i>
                            {price}
                        </span>

                    </div>

                </div>

                {/* Estado + botón */}

                <div className="col-lg-3 col-md-3 col-12">

                    <div className="reservation-actions">

                        <span className={`reservation-status ${status.toLowerCase()}`}>
                            {status}
                        </span>

                        <button
                            className="bookify-btn"
                            onClick={(event) => {
                                event.stopPropagation();
                                onClick(reservationId);
                            }}
                        >

                            Ver detalle

                            <i className="fa-solid fa-arrow-right ms-2"></i>

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

};