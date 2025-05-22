import React, { useState, useEffect } from "react";
import avatar from "../assets/zorro ogloc.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';

interface RegisterProps {
    toggleForm: () => void;
    valuesRegister: { name: string; username: string; email: string; password: string };
    setValuesRegister: (values: { name: string; username: string; email: string; password: string }) => void;
}
interface CreateUserProps {
    name: string;
    username: string;
    email: string;
    password: string;
}



const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


const Register: React.FC<RegisterProps> = ({ toggleForm, valuesRegister, setValuesRegister }) => {
    const [userData, setUserData] = useState<CreateUserProps>({ name: "", username: "", email: "", password: "" });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmError, setConfirmError] = useState<string | null>(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [touchedEmail, setTouchedEmail] = useState(false);
    const [touchedPassword, setTouchedPassword] = useState(false);
    const [touchedConfirm, setTouchedConfirm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const navigate = useNavigate();
    +

        // Validaciones individuales
        useEffect(() => {
            // Email
            if (touchedEmail) {
                setEmailError(userData.email && !emailRegex.test(userData.email.trim())
                    ? "Correo electrónico no válido."
                    : null
                );
            }
            // Password strength
            if (touchedPassword) {
                setPasswordError(userData.password && !passwordRegex.test(userData.password)
                    ? "La contraseña debe tener al menos 8 caracteres, incluir mayúsculas y números."
                    : null
                );
            }
            // Confirm match
            if (touchedConfirm) {
                setConfirmError(confirmPassword && confirmPassword !== userData.password
                    ? "Las contraseñas no coinciden."
                    : null
                );
            }
            // Form overall
            const allFilled = userData.name && userData.username && userData.email && userData.password && confirmPassword;
            const noFieldErrors = !emailError && !passwordError && !confirmError;
            setIsFormValid(Boolean(allFilled && noFieldErrors));
        }, [userData, confirmPassword, touchedEmail, touchedPassword, touchedConfirm, emailError, passwordError, confirmError]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
        setValuesRegister({ ...valuesRegister, [name]: value });
        if (name === 'email') setTouchedEmail(true);
        if (name === 'password') setTouchedPassword(true);
    };

    const handleConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setTouchedConfirm(true);
    };

    const resetAndToggle = () => {
        setUserData({ name: "", username: "", email: "", password: "" });
        setConfirmPassword("");
        toggleForm();
        setTouchedEmail(false);
        setTouchedPassword(false);
        setTouchedConfirm(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;
        try {
            console.log(userData)

            const url = `http://localhost:8000/register`
            const response = await axios.post(
                url,
                userData,
            {
                headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json' 
        }

        });
            if (response.status === 200) resetAndToggle();
        } 
        catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 406) {
          setError(err.response.data.detail || "Error al registrar usuario.");
        } else {
          setError("Error al procesar la solicitud.");
        }
      } else {
        setError("Error de conexión.");
      }
    }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg shadow-gray-500 p-6">
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-2">
                    <img src={avatar} className="w-16 md:w-24" alt="Avatar" />
                    <h1 className="text-xl font-semibold">Crea tu cuenta y comienza a ganar XP</h1>
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                        
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <label className="block text-xs font-medium text-gray-700">Nombre</label>
                            <input name="name" value={userData.name} onChange={handleChange} placeholder="Nombre" className="w-full bg-[#1C212B] text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#457884]" />
                            <label className="block text-xs font-medium text-gray-700">Email</label>
                            <input name="email" value={userData.email} onChange={handleChange} placeholder="Email" className="w-full bg-[#1C212B] text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#457884]" />
                            {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
                        </div>

                        <div className="space-y-3">
                            <label className="block text-xs font-medium text-gray-700">Usuario</label>
                            <input
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                                placeholder="Usuario"
                                className="w-full bg-[#1C212B] text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#457884]"
                            />

                            <label className="block text-xs font-medium text-gray-700">Contraseña</label>
                            <div className="relative">
                                <input
                                    name="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Contraseña"
                                    className="w-full bg-[#1C212B] text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#457884] pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(v => !v)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                            {/* Reservamos espacio fijo incluso sin error */}
                            <p className="text-red-500 text-xs">
                                {passwordError}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <label className="block text-xs font-medium text-gray-700">Confirmar Contraseña</label>
                        <input name="confirmPassword" value={confirmPassword} onChange={handleConfirm} type="password" placeholder="Confirmar Contraseña" className="w-full bg-[#1C212B] text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#457884]" />
                         {touchedConfirm && confirmError && (
                            <p className="text-red-500 text-xs">{confirmError}</p>
                            )}
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" disabled={!isFormValid} className={`px-6 py-2 rounded-lg text-white ${isFormValid ? 'bg-[#457884] hover:bg-[#3E6973]' : 'bg-gray-400 cursor-not-allowed'}`}>
                            Registrarse
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-600 text-xs sm:text-sm mt-4">¿Ya tienes cuenta? <button onClick={resetAndToggle} className="text-[#61DECA] hover:text-[#457884]">Inicia sesión</button></p>
            </div>
        </div>
    );
};
export default Register;