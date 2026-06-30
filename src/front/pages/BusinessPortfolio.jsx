import React, { useEffect, useState } from "react";

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
                const portfolioResponse = await fetch(`${backendUrl}/api/auth/business/portfolio/${businessProfileId}`, {
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

                const galleryResponse = await fetch(`${backendUrl}/api/auth/business/gallery/${businessProfileId}`, {
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
            const response = await fetch(`${backendUrl}/api/auth/business/gallery/${imageId}`, {
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
                ? `${backendUrl}/api/auth/business/portfolio/${businessProfileId}`
                : `${backendUrl}/api/auth/business/portfolio`;

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

                const galleryResponse = await fetch(`${backendUrl}/api/auth/business/gallery`, {
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
        <div className="min-vh-100 py-5" style={{ background: "linear-gradient(135deg, #f7f4ff 0%, #f8fbff 100%)" }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-8">
                        <div className="card shadow-lg border-0 rounded-4">
                            <div className="card-body p-4 p-md-5">
                                <div className="text-center mb-4">
                                    <h2 className="fw-bold mb-2">Portafolio de tu negocio</h2>
                                    <p className="text-muted mb-0">Muestra lo mejor de tu negocio y conecta con más clientes.</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="d-flex flex-column flex-md-row align-items-center gap-4 mb-5">
                                        <div className="position-relative rounded-circle d-flex align-items-center justify-content-center" style={{ width: "180px", height: "180px", border: "2px dashed #b9a7ff" }}>
                                            <label className="rounded-circle bg-light d-flex align-items-center justify-content-center overflow-hidden" style={{ width: "140px", height: "140px", cursor: "pointer" }}>
                                                {logoPreview ? <img src={logoPreview} alt="Logo" className="w-100 h-100 object-fit-cover" /> : <span className="text-muted text-center">Subir<br />logo</span>}
                                                <input type="file" accept="image/*" onChange={handleLogoChange} hidden />
                                            </label>

                                            <div className="position-absolute bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "38px", height: "38px", bottom: "10px", right: "10px" }}>
                                                📷
                                            </div>
                                        </div>

                                        <div className="text-center text-md-start">
                                            <h5 className="fw-bold mb-1">Logo del negocio</h5>
                                            <p className="text-muted mb-0">Haz clic en el círculo para subir tu logo.</p>
                                            <small className="text-muted">JPG, PNG.</small>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div>
                                                <label className="form-label fw-bold mb-0">Imágenes del negocio</label>
                                                <p className="text-muted small mb-0">Muestra tu espacio, productos o servicios.</p>
                                            </div>
                                            <span className="badge rounded-pill text-bg-light border">{savedGallery.length + images.length}/6</span>
                                        </div>

                                        <input type="file" className="form-control form-control-lg" accept="image/*" multiple onChange={handleImagesChange} />
                                        <small className="text-muted">Puedes subir máximo 6 imágenes.</small>
                                    </div>
                                    {savedGallery.length > 0 && (
                                        <div className="row g-3 mb-4">
                                            {savedGallery.map((image) => (
                                                <div className="col-6 col-md-4" key={image.id}>
                                                    <div className="position-relative">
                                                        <img src={image.image_url} alt="Imagen guardada" className="img-fluid rounded-3 shadow-sm w-100" style={{ height: "170px", objectFit: "cover" }} />
                                                        <button type="button" className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 rounded-circle" style={{ width: "28px", height: "28px", padding: 0 }} onClick={() => deleteSavedImage(image.id)}>×</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {imagesPreview.length > 0 && (
                                        <div className="row g-3 mb-4">
                                            {imagesPreview.map((image, index) => (
                                                <div className="col-6 col-md-4" key={index}>
                                                    <div className="position-relative">
                                                        <img src={image} alt={`Imagen ${index + 1}`} className="img-fluid rounded-3 shadow-sm w-100" style={{ height: "170px", objectFit: "cover" }} />
                                                        <button type="button" className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 rounded-circle" style={{ width: "28px", height: "28px", padding: 0 }} onClick={() => removeImage(index)}>×</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div>
                                                <label className="form-label fw-bold mb-0">Descripción del negocio</label>
                                                <p className="text-muted small mb-0">Cuéntales a tus clientes qué haces y qué te hace especial.</p>
                                            </div>
                                            <span className="text-muted small">{description.length}/1000</span>
                                        </div>

                                        <textarea className="form-control" rows="5" maxLength="1000" placeholder="Describe tu negocio..." value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </div>

                                    <div className="p-3 rounded-3 mb-4" style={{ backgroundColor: "#f6f1ff" }}>
                                        <h6 className="fw-bold mb-2">Tips para una buena descripción</h6>
                                        <div className="row small text-muted">
                                            <div className="col-md-6">✓ Explica claramente qué haces.</div>
                                            <div className="col-md-6">✓ Cuenta qué te hace diferente.</div>
                                            <div className="col-md-6">✓ Menciona a quién ayudas.</div>
                                            <div className="col-md-6">✓ Habla de tus servicios principales.</div>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-lg w-100 rounded-3" disabled={loading}>
                                        {loading ? "Guardando..." : "Guardar cambios"}
                                    </button>

                                    <p className="text-center text-muted small mt-3 mb-0">Tu información está segura y solo tú puedes editarla.</p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}