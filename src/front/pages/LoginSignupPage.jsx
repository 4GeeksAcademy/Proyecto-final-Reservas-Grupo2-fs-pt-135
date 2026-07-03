import { Tab, Nav } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import SignupClient from "../components/SignupClient";
import SignupBusiness from "../components/SignupBusiness";

export const LoginSignupPage = () => {
    return (
        <div className="container mt-5">

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
    );
};
