import React from "react";
import avatar from "../assets/zorro ogloc.png"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface RegisterProps {

    toggleForm: () => void;
    valuesRegister: {name: string, username: string, email: string, password: string};
    setValuesRegister: (values: {name: string, username: string, email: string, password: string}) => void

}

interface CreateUserProps {
    name: string,
    username: string,
    email: string,
    password: string,
}


const Register: React.FC<RegisterProps> = ({toggleForm, valuesRegister, setValuesRegister}) => {

    const [userData, setUserData] = useState<CreateUserProps>({

       
        name: "",
        username:  "",
        email:  "",
        password:  "",

    })

    const navigate = useNavigate();

    const [conpass, setConPass] = useState("")

    const catchUserData = (e: React.ChangeEvent<HTMLInputElement>) =>{

        setUserData({...userData, [e.target.name]: e.target.value})

        setValuesRegister({...valuesRegister, [e.target.name]: e.target.value})

        
    }

    const algo = () => {

        toggleForm();
        onlyReset();


    }

    const onlyReset = () =>{

        setConPass("")
    }

    const submitUserData = async (e: React.FormEvent) =>{

        e.preventDefault();

        if (!userData.name || !userData.username || !userData.email || !userData.password) {

            alert("Todos los campos son obligatorios")

        }

        

        else {

            try {


                const response = await axios.post("http://localhost:8000/register", userData);

                if (response.status == 200) {

                    algo();

                }

            }catch(err) {

                console.log("algo salio mal en el registro")
                console.log(err)
            }
        }

    }

    return (

   <div className="flex justify-center items-center min-h-screen p-4">
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg shadow-gray-300/50 p-6 md:p-10 transition-all duration-300 hover:shadow-gray-400/60">
        
        {/* Sección superior - Imagen y título */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-8">
            <img 
                src={avatar} 
                className="w-16 md:w-24 h-auto object-contain animate-fade-in"
                alt="Avatar"
            />
            <h1 className="text-lg md:text-xl lg:text-2xl text-center font-semibold text-gray-800">
                Crea tu cuenta y comienza a ganar XP
            </h1>
        </div>

        {/* Formulario */}
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Columna izquierda */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                        <input 
                            onChange={catchUserData}
                            value={valuesRegister.name}
                            name="name"
                            placeholder="Nombre"
                            className="w-full bg-[#1C212B] text-white text-sm md:text-base px-4 md:px-6 py-3 rounded-lg focus:ring-2 focus:ring-[#457884] focus:outline-none transition-all"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input 
                            onChange={catchUserData}
                            value={valuesRegister.email}
                            name="email"
                            placeholder="Email"
                            className="w-full bg-[#1C212B] text-white text-sm md:text-base px-4 md:px-6 py-3 rounded-lg focus:ring-2 focus:ring-[#457884] focus:outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Columna derecha */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Usuario</label>
                        <input 
                            onChange={catchUserData}
                            value={valuesRegister.username}
                            name="username"
                            placeholder="Nombre de Usuario"
                            className="w-full bg-[#1C212B] text-white text-sm md:text-base px-4 md:px-6 py-3 rounded-lg focus:ring-2 focus:ring-[#457884] focus:outline-none transition-all"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                        <input 
                            onChange={catchUserData}
                            value={valuesRegister.password}
                            name="password"
                            type="password"
                            placeholder="Contraseña"
                            className="w-full bg-[#1C212B] text-white text-sm md:text-base px-4 md:px-6 py-3 rounded-lg focus:ring-2 focus:ring-[#457884] focus:outline-none transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Confirmar Contraseña */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Contraseña</label>
                <input 
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirmar Contraseña"
                    className="w-full max-w-xs md:max-w-sm bg-[#1C212B] text-white text-sm md:text-base px-4 md:px-6 py-3 rounded-lg focus:ring-2 focus:ring-[#457884] focus:outline-none transition-all"
                />
            </div>
        </div>

        {/* Botón de Registro */}
        <div className="mt-8 md:mt-12 flex justify-end">
            <button 
                onClick={submitUserData}
                className="bg-[#457884] hover:bg-[#3E6973] text-white text-sm md:text-base px-6 md:px-8 py-2 md:py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
                Registrarse
            </button>
        </div>

        {/* Enlace de Login */}
        <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
                ¿Ya tienes cuenta?{' '}
                <a 
                    onClick={algo}
                    className="text-[#61DECA] hover:text-[#457884] cursor-pointer transition-colors"
                >
                    Inicia sesión
                </a>
            </p>
        </div>
    </div>
</div>
    )    


}


export default Register