import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/ReservationDetailModal.css";

export const ReservationDetailModal = ({
    show,
    onClose,
    reservation
}) => {

    if (!reservation) return null;

    return (

        <Modal
            show={show}
            onHide={onClose}
            centered
            size="lg"
        >

            <Modal.Header closeButton className="reservation-modal-header">

                <Modal.Title>

                    Detalle de la reserva

                </Modal.Title>

            </Modal.Header>

            <Modal.Body className="reservation-modal-body">

                <div className="row g-4">

                    <div className="col-lg-4 text-center">

                        <img
                            src={reservation.image}
                            alt={reservation.businessName}
                            className="reservation-modal-image"
                        />

                    </div>

                    <div className="col-lg-8">

                        <h3 className="reservation-modal-business">

                            {reservation.businessName}

                        </h3>

                        <div className="reservation-detail-item">

                            <span>Servicio</span>

                            <strong>{reservation.service}</strong>

                        </div>

                        <div className="reservation-detail-item">

                            <span>Fecha</span>

                            <strong>{reservation.date}</strong>

                        </div>

                        <div className="reservation-detail-item">

                            <span>Hora</span>

                            <strong>{reservation.time}</strong>

                        </div>

                        <div className="reservation-detail-item">

                            <span>Precio</span>

                            <strong>{reservation.price}</strong>

                        </div>

                        <div className="reservation-detail-item">

                            <span>Estado</span>

                            <span className={`reservation-status ${reservation.status.toLowerCase()}`}>

                                {reservation.status}

                            </span>

                        </div>

                        <div className="reservation-detail-item">

                            <span>Notas</span>

                            <strong>

                                {reservation.notes || "Sin observaciones"}

                            </strong>

                        </div>

                    </div>

                </div>

            </Modal.Body>

            <Modal.Footer className="reservation-modal-footer">

                {reservation.status === "Activa" && (

                    <Button
                        variant="danger"
                    >

                        Cancelar reserva

                    </Button>

                )}

                <Button
                    className="bookify-btn"
                    onClick={onClose}
                >

                    Cerrar

                </Button>

            </Modal.Footer>

        </Modal>

    );

};