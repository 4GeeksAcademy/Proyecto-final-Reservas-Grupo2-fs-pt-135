import { Tab, Nav } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import SignupClient from "../components/SignupClient";
import SignupBusiness from "../components/SignupBusiness";

export const LoginSignupPage = ({ onClose }) => {
    return (
        <div
            className="modal-overlay"
            onClick={onClose} // si clicas fuera,se cierra
        >

            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()} // evita que el clic se propague al overlay
            >
                <h2 className="text-center mb-4">Bienvenido</h2>

                <Tab.Container defaultActiveKey="login">
                    <Nav variant="tabs" className="mb-3">
                        <Nav.Item>
                            <Nav.Link eventKey="login">Iniciar Sesión</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="signup">Registrarse</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Tab.Content>
                        <Tab.Pane eventKey="login">
                            <LoginForm />
                        </Tab.Pane>

                        <Tab.Pane eventKey="signup-client">
                            <SignupClient />
                        </Tab.Pane>

                        <Tab.Pane eventKey="signup-business">
                            <SignupBusiness />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </div>
    );
};
