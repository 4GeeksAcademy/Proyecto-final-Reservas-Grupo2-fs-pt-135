import React from "react";
import { Container, Button, Form, FormControl } from "react-bootstrap";

export const Hero = () => {
    return (
        // Usamos las clases que definiremos en index.css
        <div className="hero-container">
            <Container className="text-center">
                {/* Titulo Pricipal*/}
                <h1 className="display-3 fw-bold mb-3">SPORT CLICK</h1>

                {/* Subtitulo */}
                <p className="lead mb-4">Descubre y reserva una cita con profesionales cerca de ti</p>
                {/* Barra de Búsqueda*/}
                <Form className="d-flex justify-content-center">
                    <FormControl
                        type="text"
                        placeholder="Buscar servicios o negocios ..."
                        className="search-input"
                    />
                    <Button
                        variant="primary"
                        className="search-button"
                    >
                        Buscar
                    </Button>
                </Form>
            </Container>
        </div >
    );
};


