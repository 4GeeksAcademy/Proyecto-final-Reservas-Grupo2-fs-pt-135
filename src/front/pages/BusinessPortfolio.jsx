import React, { useEffect, useState } from "react";
import "../styles/BusinessPortfolio.css";

export const BusinessPortfolio = () => {
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(false);

    const [portfolioExists, setPortfolioExists] = useState(false);
    const [savedGallery, setSavedGallery] = useState([]);

    useEffect(() => {
        const getPortfolioData = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const businessProfileId = sessionStorage.getItem("business_profile_id");
            const token = sessionStorage.getItem("token");

            if (!businessProfileId) return;

            try {
                const portfolioResponse = await fetch(`${backendUrl}/api/business-portfolio/${businessProfileId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });


                if (portfolioResponse.status === 200) {
                    const portfolioData = await portfolioResponse.json();

                    setPortfolioExists(true);
                    setDescription(portfolioData.description || "");
                    setLogoPreview(portfolioData.logo_url || null);
                }

                if (portfolioResponse.status === 404) {
                    setPortfolioExists(false);
                }

                const galleryResponse = await fetch(`${backendUrl}/api/business-gallery/business/${businessProfileId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (galleryResponse.ok) {
                    const galleryData = await galleryResponse.json();
                    setSavedGallery(galleryData.images || []);
                }

            } catch (error) {
                console.error(error);
            }
        };

        getPortfolioData();
    }, []);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLogo(file);
        setLogoPreview(URL.createObjectURL(file));
    }

    const handleImagesChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        const totalImages = images.length + selectedFiles.length;

        if (totalImages > 6) {
            alert("Solo puedes subir máximo 6 imágenes");
            return;
        }

        const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));

        setImages([...images, ...selectedFiles]);
        setImagesPreview([...imagesPreview, ...newPreviews]);
    };

    const removeImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));

        setImagesPreview(
            imagesPreview.filter((_, index) => index !== indexToRemove)
        );
    };

    const deleteSavedImage = async (imageId) => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const token = sessionStorage.getItem("token");

        try {
            const response = await fetch(`${backendUrl}/api/business-gallery/image/${imageId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.msg || "Error al eliminar la imagen");
                return;
            }

            setSavedGallery(savedGallery.filter(image => image.id !== imageId));

        } catch (error) {
            console.error(error);
            alert("Error de conexión con el servidor");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const businessProfileId = sessionStorage.getItem("business_profile_id");
        const token = sessionStorage.getItem("token");

        if (!businessProfileId) {
            alert("No se encontró perfil del negocio. Inicia sesión nuevamente");
            return;
        }

        if (!description) {
            alert("Agrega una descripción");
            return;
        }

        if (!portfolioExists && !logo) {
            alert("Agrega un logo");
            return;
        }

        try {
            setLoading(true);

            const portfolioFormData = new FormData();
            portfolioFormData.append("business_profile_id", businessProfileId);
            portfolioFormData.append("description", description);

            if (logo) {
                portfolioFormData.append("logo", logo);
            }

            const portfolioUrl = portfolioExists
                ? `${backendUrl}/api/business-portfolio/${businessProfileId}`
                : `${backendUrl}/api/business-portfolio/`;

            const portfolioMethod = portfolioExists ? "PATCH" : "POST";

            const portfolioResponse = await fetch(portfolioUrl, {
                method: portfolioMethod,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: portfolioFormData
            });

            const portfolioData = await portfolioResponse.json();

            if (!portfolioResponse.ok) {
                alert(portfolioData.msg || "Error al guardar el portafolio");
                return;
            }

            for (const image of images) {
                const galleryFormData = new FormData();
                galleryFormData.append("business_profile_id", businessProfileId);
                galleryFormData.append("image", image);

                const galleryResponse = await fetch(`${backendUrl}/api/business-gallery/`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: galleryFormData
                });

                const galleryData = await galleryResponse.json();

                if (!galleryResponse.ok) {
                    alert(galleryData.msg || "Error al subir una imagen de la galería");
                    return;
                }

                setSavedGallery(prevGallery => [...prevGallery, galleryData.image]);
            }

            setPortfolioExists(true);
            setLogo(null);
            setImages([]);
            setImagesPreview([]);

            alert("Portafolio guardado correctamente");

        } catch (error) {
            console.error(error);
            alert("Error de conexión con el servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="business-portfolio-page">
            <div className="container py-5">
                <div className="portfolio-header mb-5">
                    <span className="portfolio-eyebrow">Panel empresa</span>
                    <h1>Portafolio de tu negocio</h1>
                    <p>Muestra lo mejor de tu negocio y conecta con más clientes.</p>
                </div>

                <div className="portfolio-card">
                    <form onSubmit={handleSubmit}>
                        <section className="portfolio-logo-section">
                            <div className="portfolio-logo-upload">
                                <label className="portfolio-logo-label">
                                    {logoPreview ? (
                                        <img src={logoPreview} alt="Logo" />
                                    ) : (
                                        <span>Subir<br />logo</span>
                                    )}
                                    <input type="file" accept="image/*" onChange={handleLogoChange} hidden />
                                </label>

                                <div className="portfolio-camera-button">📷</div>
                            </div>

                            <div>
                                <h3>Logo del negocio</h3>
                                <p>Haz clic en el círculo para subir tu logo.</p>
                                <small>JPG, PNG.</small>
                            </div>
                        </section>

                        <section className="portfolio-section">
                            <div className="portfolio-section-header">
                                <div>
                                    <h4>Imágenes del negocio</h4>
                                    <p>Muestra tu espacio, productos o servicios.</p>
                                </div>

                                <span className="portfolio-counter">
                                    {savedGallery.length + images.length}/6
                                </span>
                            </div>

                            <input
                                type="file"
                                className="portfolio-file-input"
                                accept="image/*"
                                multiple
                                onChange={handleImagesChange}
                            />

                            <small className="portfolio-help-text">Puedes subir máximo 6 imágenes.</small>
                        </section>

                        {savedGallery.length > 0 && (
                            <div className="portfolio-gallery-grid">
                                {savedGallery.map((image) => (
                                    <div className="portfolio-image-card" key={image.id}>
                                        <img src={image.image_url} alt="Imagen guardada" />
                                        <button type="button" onClick={() => deleteSavedImage(image.id)}>×</button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {imagesPreview.length > 0 && (
                            <div className="portfolio-gallery-grid">
                                {imagesPreview.map((image, index) => (
                                    <div className="portfolio-image-card" key={index}>
                                        <img src={image} alt={`Imagen ${index + 1}`} />
                                        <button type="button" onClick={() => removeImage(index)}>×</button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <section className="portfolio-section">
                            <div className="portfolio-section-header">
                                <div>
                                    <h4>Descripción del negocio</h4>
                                    <p>Cuéntales a tus clientes qué haces y qué te hace especial.</p>
                                </div>

                                <span className="portfolio-description-count">{description.length}/1000</span>
                            </div>

                            <textarea
                                className="portfolio-textarea"
                                rows="5"
                                maxLength="1000"
                                placeholder="Describe tu negocio..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </section>

                        <div className="portfolio-tips">
                            <h5>Tips para una buena descripción</h5>
                            <div>
                                <span>✓ Explica claramente qué haces.</span>
                                <span>✓ Cuenta qué te hace diferente.</span>
                                <span>✓ Menciona a quién ayudas.</span>
                                <span>✓ Habla de tus servicios principales.</span>
                            </div>
                        </div>

                        <button type="submit" className="portfolio-submit-button" disabled={loading}>
                            {loading ? "Guardando..." : "Guardar cambios"}
                        </button>

                        <p className="portfolio-secure-text">
                            Tu información está segura y solo tú puedes editarla.
                        </p>
                    </form>
                </div>
            </div>
        </main>
    );
}