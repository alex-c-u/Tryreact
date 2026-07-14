import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Registro = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            
            await createUserWithEmailAndPassword(auth, email, password);
            
            navigate('/');
        } catch (error) {
           
            if (error.code === 'auth/email-already-in-use') {
                               const quiereLoguearse = window.confirm(
                    'Este correo electrónico ya está registrado. ¿Desea intentar iniciar sesión ? '
                );

                if (quiereLoguearse) {
                                        login
                    navigate('/login');
                } else {
                    inicio
                    navigate('/');
                }

            } else {
                setError('Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente.');
                console.error("Error en el registro:", error.message);
            }
        }
    };
    return (
        <div className="auth-container">
            <h2>Crear una nueva cuenta</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        value={email}

                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}

                        onChange={(e) => setPassword(e.target.value)}
                        required

                        placeholder="Mínimo 6 caracteres"

                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Registro;