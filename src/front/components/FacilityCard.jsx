import React from "react";
import { Card, Button } from "react-bootstrap";
import "./FacilityCard.css"; // Asegúrate de importar el archivo CSS

export const FacilityCard = ({ title, description, imageUrl }) => {
    return (
        // Clase principal para el CSS
        <Card className="facility-card">
            <Card.Img variant="top" src={imageUrl} className="card-img-top" />
            <Card.Body>
                <Card.Title className="card-title">{title}</Card.Title>
                <Card.Text className="card-text">{description}</Card.Text>
                <Button className="btn-custom">Reservar</Button>
            </Card.Body>
        </Card>
    );
};