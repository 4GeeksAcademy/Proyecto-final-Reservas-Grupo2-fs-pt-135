import React from "react";

export const UserProfileView = () => {
    const [password, setPassword] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Nueva contraseña:", password);
        // Aquí luego se conectará con Flask:
        //fetch("http://localhost:5000/api/profile/password", {...})
    };

    return (
        <div className="profile-container">
            <div className="profile-box">
                <h2> cambiar contraseña</h2>

                <form onSubmit={handleSubmit} className="mt-3">
                    <div className="mb-3">
                        <label className="form-label">Nueva contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>


                    <button type="submit" className="btn btn-primary">
                        Guardar cambios
                    </button>
                </form>
            </div>
        </div>
    );
};

