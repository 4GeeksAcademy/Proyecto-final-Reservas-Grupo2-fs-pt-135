import React, {useState} from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { RegisterRoleModal } from "../components/RegisterRoleModal";

const Layout = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="layout-container">

            <Navbar setShowModal={setShowModal} />

            <main className="main-content">
                <Outlet />
            </main>

            <Footer />

            <RegisterRoleModal 
                showModal={showModal} 
                setShowModal={setShowModal} 
            />

        </div>
    );
};

export default Layout;