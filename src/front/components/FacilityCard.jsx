import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./FacilityCard.css"; // Asegúrate de importar el archivo CSS

export const FacilityCard = ({ title, description, imageUrl }) => {
    const navigate = useNavigate();

    const handleReservation = () => {
        navigate("/login-signup");
    };

    return (
        // Clase principal para el CSS
        <Card className="facility-card">
            <Card.Img variant="top" src={imageUrl} className="card-img-top" />
            <Card.Body>
                <Card.Title className="card-title">{title}</Card.Title>
                <Card.Text className="card-text">{description}</Card.Text>
                <Button
                    className="btn-custom"
                    onClick={() => console.log("Reservar clicked")}
                >
                    Reservar
                </Button>
            </Card.Body>
        </Card>
    );
};