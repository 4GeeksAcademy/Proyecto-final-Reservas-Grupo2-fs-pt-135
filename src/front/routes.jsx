import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./pages/Layout";
import LayoutSinNav from "./pages/LayoutSinNav";
import Home from "./pages/Home";
import { Demo } from "./pages/Demo";
import { Login } from "./pages/Login";
import { RegisterClient } from "./pages/RegisterClient";
import { RegisterBusiness } from "./pages/RegisterBusiness";
import { CreateService } from "./pages/CreateService";
import { BusinessPortfolio } from "./pages/BusinessPortfolio";
import Empresas from "./components/Empresas";
import { EmpresaDetalles } from "./pages/EmpresaDetalles";
import { ServiciosEmpresa } from "./pages/ServiciosEmpresa.jsx";
import HomeClient from "./pages/HomeClient";
import Favorites from "./pages/Favorites";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
        <Route index element={<Home />} />
        <Route path="empresas" element={<Empresas />} />
        <Route path="demo" element={<Demo />} />
      </Route>

      {/* ESTA RUTA DEBE IR ANTES */}
      <Route path="empresa/:id/servicios" element={<LayoutSinNav />}>
        <Route index element={<ServiciosEmpresa />} />
      </Route>

      {/* ESTA VA DESPUÉS */}
      <Route path="empresa/:id" element={<EmpresaDetalles />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register/client" element={<RegisterClient />} />
      <Route path="/register/business" element={<RegisterBusiness />} />
      <Route path="/services/create" element={<CreateService />} />
      <Route path="/business/portfolio" element={<BusinessPortfolio />} />
      <Route path="/home-client" element={<HomeClient />} />
      <Route path="/favorites" element={<Favorites />} />
    </>
  )
);