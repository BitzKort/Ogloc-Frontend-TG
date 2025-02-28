import React, { useEffect } from "react";
import fondo from "../assets/background login.webp"
import { useState } from "react";
import axios from "axios";
interface LoginProps {
    toggleForm: () => void;
    valuesLogin: { email: string; password: string }; 
    setValuesLogin: (values: { email: string; password: string }) => void
}

interface loginDataProps {

    email: string;
    password: string;
}


 

const Login: React.FC<LoginProps> = ({toggleForm, valuesLogin, setValuesLogin}) => {

    const [userData, setUserData] = useState<loginDataProps>({

        email: "",
        password:"",
        })
    
    
    const [error, setError] = useState<string | null >(null);

    const catchUserData = (e: React.ChangeEvent<HTMLInputElement>) =>{

        setUserData({ ...userData, [e.target.name]: e.target.value });

        setValuesLogin({...valuesLogin, [e.target.name]: e.target.value});

    }
    
    const submitData = async (e: React.FormEvent) => {

        e.preventDefault();

        if (!userData.email || !userData.password) {
            alert("Todos los campos son obligatorios");
            return;
          }
        
          else {

            try{

                const response = await axios.post("http://localhost:8000/login", userData);
                console.log(response);
            } catch (err) {

                setError("algo paso")   
                console.log(error)
            }


          }


    }

    return (

            <div className="flex flex-col justify-center items-center bg-white rounded-2xl w-md h-md shadow-sm shadow-gray-500 rounded-2xl">

                <img src = {fondo} className=" w-full h-full object-cover rounded-2xl"/>

                <div className="flex flex-col gap-4 justify-center items-center w-full ">
                    <div className="py-4">
                        <label className="text-2xl"> LogIn</label>
                        
                    </div>

                    <input onChange={catchUserData} name="email" value={valuesLogin.email} placeholder= "Email" className="bg-[#1C212B] text-white text-md w-80 py-3 px-6 rounded-md " required>

                    </input>

                    <input onChange={catchUserData} name="password" value={valuesLogin.password} type= "password" placeholder="Password" className="bg-[#1C212B] text-white text-md w-80 py-3 px-6 rounded-md " required>
                    
                    </input>

                    <div className="w-full flex justify-end px-5">

                    <button type="submit" onClick={submitData} className="bg-[#457884] hover:bg-[#3E6973] text-white text-md py-2 px-7 rounded"> Ingresar </button>

                    </div>

                    
                    <div className="flex flex-col justify-center items-center pt-10 pb-8 gap-5">

                        <a href="https://www.youtube.com/watch?v=2FBvY3hQRaY" className="hover:text-[#61DECA]"> Olvidaste tu contraseña?</a>

                        <p> No tienes cuenta? 
                            
                            <a  onClick={toggleForm} className=" text-[#61DECA] hover:text-[#457884]"> Registrate.</a>


                        </p>

                    </div>
                </div>
            </div>


    )
}

export default Login 