import React, { useState } from "react";
import MainLayout from "../layout/mainLayout";
import { ArrowRight, Lock, EyeOff, Eye} from "lucide-react";
import axios from "axios";

interface changePasswordProps {
  showNavBar?: boolean;
}

const changePassword: React.FC<changePasswordProps> = ({ showNavBar = true }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [token, setToken] = useState("");
    const [tokenError, setTokenError] = useState("");


    // Regex: Al menos 8 caracteres, una mayúscula, una minúscula y un número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;



    React.useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const urlToken = queryParams.get('token');
        console.log(urlToken)
        if (!urlToken) {
            setTokenError("Token inválido o enlace corrupto");
        } else {
            setToken(urlToken);
        }
    }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setPasswordError("");

        // Validaciones del cliente
        if (!password || !confirmPassword) {
            setError("Ambos campos son requeridos");
            return;
        }
        
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (!passwordRegex.test(password)) {
            setPasswordError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número");
            return;
        }
        
        setIsSubmitting(true);

        try {
        const response = await axios.put(
            "http://localhost:8000/reset-password",
            {
                new_password: password,
                token: token 
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

            if (response.status === 200) {
                alert("¡Contraseña actualizada con éxito!");
                setPassword("");
                setConfirmPassword("");
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    // Manejar error de token inválido
                    if (error.response.data.detail?.includes("token")) {
                        setTokenError("Token inválido o expirado");
                    } else {
                        setError(error.response.data.detail || "Error en la solicitud");
                    }
                }
                // ... otros errores
            }
        }
    };

    return (
        <MainLayout navBar={showNavBar}>
        <div className="w-full max-w-md">
            <div className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
            <div className="mb-6 text-center">
                <h1 className="text-2xl sm:text-3xl font-roboto text-gray-800 mb-2">
                Establece tu nueva contraseña
                </h1>
                <p className="text-gray-500 text-sm sm:text-sm">
                    Crea una nueva contraseña segura para tu cuenta. 
                    
                </p>

                <span className="text-red-500 text-sm mt-1">{tokenError}</span>
            </div>
            
            <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="flex flex-col">
                    <label className="text-sm text-gray-700 mb-1 font-medium">
                        Nueva contraseña
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordError("");
                            }}
                            placeholder="Ingresa tu nueva contraseña"
                            className="bg-[#1C212B] text-white text-sm sm:text-base py-3 pl-10 pr-4 rounded-lg w-full focus:ring-2 focus:ring-[#457884] focus:outline-none transition-all duration-300"
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {passwordError && (
                        <span className="text-red-500 text-sm mt-1">{passwordError}</span>
                    )}
                </div>

                <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1 font-medium">
                    Confirma tu contraseña
                </label>
                <div className="relative">
                    <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    autoComplete="off"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirma tu contraseña"
                    className="bg-[#1C212B] text-white text-sm sm:text-base py-3 pl-10 pr-4 rounded-lg w-full focus:ring-2 focus:ring-[#457884] focus:outline-none transition-all duration-300"
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                        >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                </div>
                </div>

                {error && (
                <div className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">
                    {error}
                </div>
                )}

                <div className="w-full flex justify-end mt-6">
                <button
                    type="submit"
                    disabled={isSubmitting || !!tokenError}
                    className={`flex items-center gap-2 bg-[#457884] hover:bg-[#3E6973] text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-300 ${
                            (isSubmitting || tokenError) ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                >
                    {isSubmitting ? "Actualizando..." : "Cambiar contraseña"}
                    {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                </button>
                </div>
            </form>
            </div>
        </div>
        </MainLayout>
    );
};

export default changePassword;