import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export const Features = () => {
    const facilities = ["Fútbol", "Baloncesto", "Tenis", "Pádel", "Natación", "Gimnasio"];

    return (
        <Container className="my-5">
            <Row>
                {facilities.map((sport, index) => (
                    <Col key={index} xs={6} md={2} className="mb-2">
                        <div className="simple-card border">
                            <p className="m-0 p-2">{sport}</p>

                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

