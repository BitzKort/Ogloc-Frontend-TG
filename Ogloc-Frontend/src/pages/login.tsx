import React from "react";
import fondo from "../assets/background login.webp"
import { Link } from "react-router-dom";


interface LoginProps {

    toggleForm: () => void;
}

const Login: React.FC<LoginProps> = ({toggleForm}) => {

    return (

            <div className="flex flex-col justify-center items-center bg-white rounded-2xl w-md h-md">

                <img src = {fondo} className=" w-full h-full object-cover rounded-2xl"/>

                <div className="flex flex-col gap-4 justify-center items-center w-full ">
                    <div className="py-4">
                        <label className="text-2xl"> LogIn</label>
                        
                    </div>

                    <input placeholder= "Email" className="bg-[#1C212B] text-white text-md w-80 py-3 px-6 rounded-md ">

                    </input>

                    <input type= "password" placeholder="Password" className="bg-[#1C212B] text-white text-md w-80 py-3 px-6 rounded-md ">
                    
                    </input>

                    <div className="w-full flex justify-end px-5">

                    <button onClick={toggleForm} className="bg-[#457884] hover:bg-[#3E6973] text-white text-md py-2 px-7 rounded"> Ingresar </button>

                    </div>

                    
                    <div className="flex flex-col justify-center items-center pt-10 pb-8 gap-5">

                        <a href="https://www.youtube.com/watch?v=2FBvY3hQRaY" className="hover:text-[#61DECA]"> Olvidaste tu contraseña?</a>

                        <p> No tienes cuenta? 
                            
                            <Link to="/register" className=" text-[#61DECA] hover:text-[#457884]"> Registrate.</Link>


                        </p>

                    </div>
                </div>
            </div>


    )
}

export default Login 