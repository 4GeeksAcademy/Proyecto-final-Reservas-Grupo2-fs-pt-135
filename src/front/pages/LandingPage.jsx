import React from "react";
// Usamos ../ para salir de "pages" y entrar en "component"
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { FacilityCard } from "../components/FacilityCard";
import { Container, Row, Col } from "react-bootstrap";

export const LandingPage = () => {
  return (
    <>
      <Hero />
      <Features />

      <Container className="my-5">
        <Row>
          <Col md={4} className="mb-4">
            <FacilityCard />
          </Col>

          <Col md={4} className="mb-4">
            <FacilityCard />
          </Col>

          <Col md={4} className="mb-4">
            <FacilityCard />
          </Col>
        </Row>
      </Container>
    </>
  );
};