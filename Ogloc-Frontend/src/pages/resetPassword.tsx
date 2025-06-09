import React, { useState } from "react";
import MainLayout from "../layout/mainLayout";
import { ArrowRight,ArrowLeft, Mail } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface ForgotPasswordProps {
  showNavBar?: boolean;
}



const ForgotPassword: React.FC<ForgotPasswordProps> = ({ showNavBar = true }) => {
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [error, setError] = useState("");
    const [emailFormatError, setEmailFormatError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailFormatError("");

    // Validaciones del cliente
    if (!email || !confirmEmail) {
        setError("Ambos campos son requeridos");
        return;
    }
    
    if (email !== confirmEmail) {
        setError("Los correos electrónicos no coinciden");
        return;
    }

    if (!emailRegex.test(email.trim())) {
        setEmailFormatError("Correo electrónico no válido");
        return;
    }
    
    setIsSubmitting(true);

    const trimmedEmail = email.trim()

    try {
        const url = `http://localhost:8000/forgot-password`;
        
        const response = await axios.post(
            url,
            null,

            {
                headers: {
                    'accept': 'application/json'
                },

                params: {
                    'email': trimmedEmail
                },
            }
        );
        if (response.status === 200) {
            alert("¡Correo de recuperación enviado con éxito!");
            // Opcional: Resetear los campos
            setEmail("");
            setConfirmEmail("");
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
              
                setError(error.response.data.detail || "Error en la solicitud");
            } else {
                setError("Error al procesar la solicitud");
            }
        } else {
            setError("Error de conexión");
        }
    } finally {
        setIsSubmitting(false);
    }
};


    return (
        <MainLayout navBar={showNavBar}>
        <div className="w-full max-w-md">
            <div className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
            <div className="mb-6 text-center">
                <h1 className="text-2xl sm:text-3xl font-roboto text-gray-800 mb-2">
                Recupera tu contraseña
                </h1>
                <p className="text-gray-500 text-sm sm:text-sm">
                Ingresa tu correo para recibir un enlace de recuperación
                </p>
            </div>
            
            <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1 font-medium">
                    Correo electrónico
                </label>
                <div className="relative">
                    <input
                    name="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailFormatError(""); // Limpiar error al escribir
                    }}
                    placeholder="Ingresa tu correo"
                    className="bg-[#1C212B] text-white text-sm sm:text-base py-3 pl-10 pr-4 rounded-lg w-full focus:ring-2 focus:ring-[#457884] focus:outline-none transition-all duration-300"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
                {emailFormatError && (
                    <span className="text-red-500 text-sm mt-1">{emailFormatError}</span>
                )}
                </div>

                <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1 font-medium">
                    Confirma tu correo electrónico
                </label>
                <div className="relative">
                    <input
                    name="confirmEmail"
                    value={confirmEmail}
                    autoComplete="off"
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    
                    placeholder="Confirma tu correo"
                    className="bg-[#1C212B] text-white text-sm sm:text-base py-3 pl-10 pr-4 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
                </div>

                {error && (
                <div className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">
                    {error}
                </div>
                )}

                <div className="w-full flex justify-between gap-4 mt-6">

                <button
                    onClick={() => navigate(-1)}
                    className={`flex items-center gap-1 bg-[#457884] hover:bg-[#3E6973] text-white font-medium py-2.5 px-2 rounded-lg transition-all duration-300 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                >
                   <ArrowLeft className="h-4 w-4"/>
                    Volver
                    
                </button>   

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex items-center gap-2 bg-[#457884] hover:bg-[#3E6973] text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-300 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                >
                    {isSubmitting ? "Enviando..." : "Recuperar"}
                    {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                    
                </button>


                </div>
            </form>
            </div>
        </div>
        </MainLayout>
    );
};

export default ForgotPassword;