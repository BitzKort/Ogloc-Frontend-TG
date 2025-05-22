import React, { useState } from "react";
import fondo from "../assets/background login.webp";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  toggleForm: () => void;
  valuesLogin: { email: string; password: string };
  setValuesLogin: (values: { email: string; password: string }) => void;
}

interface loginDataProps {
  email: string;
  password: string;
}

// Regex de validación de correo electrónico
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
const isValidEmail = (email: string) => emailRegex.test(email.trim());

const Login: React.FC<LoginProps> = ({ toggleForm, valuesLogin, setValuesLogin }) => {
  const [userData, setUserData] = useState<loginDataProps>({
    email: "",
    password: "",
  });

  const [touchedEmail, setTouchedEmail] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const catchUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setValuesLogin({ ...valuesLogin, [name]: value });
  };


  const clickToResetPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/resetPassword');
  };
 const submitData = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!userData.email || !userData.password) {
    alert("Todos los campos son obligatorios");
    return;
  }

  if (!isValidEmail(userData.email)) {
    alert("Por favor, ingresa un correo electrónico válido.");
    return;
  }

  try {
    // Construimos el body en formato x-www-form-urlencoded
    const formData = new URLSearchParams();
    formData.append("username", userData.email);
    formData.append("password", userData.password);

    const response = await axios.post(
      "http://localhost:8000/login",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.status === 200) {
      // En tu backend devuelves { access_token: "...", token_type: "bearer" }
      localStorage.setItem("auth", response.data.access_token);
      navigate("/");
    }
  } catch (err) {
    setError("Ocurrió un error al iniciar sesión.");
    console.error(err);
  }
};



  const isEmailValid = isValidEmail(userData.email);
  const isFormValid = isEmailValid && userData.password;

  return (
    <div className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-sm shadow-gray-500 p-4">
      {/* Contenedor con ancho responsive */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <img
          src={fondo}
          className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-2xl mb-4"
          alt="fondo"
        />

        <div className="flex flex-col gap-4 justify-center items-center w-full">
          <div className="py-2">
            <label className="text-xl sm:text-2xl">LogIn</label>
          </div>

          <input
            onChange={catchUserData}
            onBlur={() => setTouchedEmail(true)}
            name="email"
            value={valuesLogin.email}
            placeholder="Email"
            className={`bg-[#1C212B] text-white text-sm sm:text-md py-3 px-4 rounded-md w-full ${
              touchedEmail && !isEmailValid ? "border border-red-500" : ""
            }`}
            required
          />

          {touchedEmail && !isEmailValid && (
            <span className="text-red-500 text-xs sm:text-sm">
              Correo electrónico no válido
            </span>
          )}

          <input
            onChange={catchUserData}
            name="password"
            type="password"
            value={valuesLogin.password}
            placeholder="Contraseña"
            className="bg-[#1C212B] text-white text-sm sm:text-md py-3 px-4 rounded-md w-full"
            required
          />

          <div className="w-full flex justify-end mt-2">
            <button
              type="submit"
              onClick={submitData}
              disabled={!isFormValid}
              className={`bg-[#457884] hover:bg-[#3E6973] text-white text-sm md:text-base px-6 md:px-8 py-2 md:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              isFormValid
                  ? "bg-[#457884] hover:bg-[#3E6973]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Ingresar
            </button>
          </div>

          <div className="flex flex-col justify-center items-center pt-4 pb-6 gap-3 text-xs sm:text-sm">
            <a
                  onClick={clickToResetPassword}
                  className="text-gray-600 hover:text-[#61DECA]"
                >
                ¿Olvidaste tu contraseña?
            </a>   

            <p className="text-gray-600">
              ¿No tienes cuenta?
              <button
                onClick={toggleForm}
                className="text-[#61DECA] hover:text-[#457884] cursor-pointer ml-1"
              >
                Regístrate.
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
