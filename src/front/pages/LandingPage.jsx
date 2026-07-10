import React, { useEffect } from "react";
import { Navigate, } from "react-router-dom";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { FacilityCard } from "../components/FacilityCard";
import { Container, Row, Col } from "react-bootstrap";


export const LandingPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Redirige al usuario a la página de inicio si ya ha iniciado sesión
  if (user) {
    if (user.role === "cliente") return <Navigate to="/home-cliente" replace />;
    if (user.role === "empresa") return <Navigate to="/home-empresa" replace />;
  }

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