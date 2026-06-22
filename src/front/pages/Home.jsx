import React from "react";
import Hero from "../components/Hero";
import { CategorySection } from "../components/CategoryCard";
import EliteProfessionals from "../components/EliteProfessionals";
import InfoSection from "../components/InfoSection";

const Home = () => {
  return (
    <div>

      <Hero />

      <CategorySection />

      <EliteProfessionals />

      <InfoSection />

    </div>
  );
};

const { store, dispatch } = useGlobalReducer()

const loadMessage = async () => {
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

    const response = await fetch(backendUrl + "/api/hello")
    const data = await response.json()

    if (response.ok) dispatch({ type: "set_hello", payload: data.message })

    return data

  } catch (error) {
    if (error.message) throw new Error(
      `Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
    );
  }

}

useEffect(() => {
  loadMessage()
}, [])

return (
  <div className="text-center mt-5">
    <h1 className="display-4">Hello Rigo!!</h1>
    <p className="lead">
      <img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" />
    </p>
    <div className="alert alert-info">
      {store.message ? (
        <span>{store.message}</span>
      ) : (
        <span className="text-danger">
          Loading message from the backend (make sure your python 🐍 backend is running)...
        </span>
      )}
    </div>
  </div>
);
}; 