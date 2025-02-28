import React, { HTMLInputTypeAttribute } from "react";
import avatar from "../assets/zorro ogloc.png"
import { useState } from "react";

interface RegisterProps {

    toggleForm: () => void;
}

interface CreateUserProps {

    name: string,
    userName: string,
    email: string,
    password: string,
    conpasword: string
}



const Register: React.FC<RegisterProps> = ({toggleForm}) => {

    const [userData, setUserData] = useState<CreateUserProps>({

       
        name: "",
        userName:  "",
        email:  "",
        password:  "",
        conpasword:  ""

    })

    const catchUserData = (e: React.ChangeEvent<HTMLInputElement>) =>{

        setUserData({...userData, [e.target.name]: e.target.value})
    }

    const submitUserData = async (e: React.FormEvent) =>{

        e.preventDefault();

        if (!userData.name || !userData.userName || !userData.email || !userData.password || !userData.conpasword) {

            alert("Todos los campos son obligatorios")

        }

        else {

            console.log(userData)
        }

    }

    return (

        <div className="flex flex-row items-center ">

            <div className="flex flex-col items-center justify-center w-full h-full py-70 px-10 bg-[#457884] rounded-2xl shadow-sm shadow-gray-500">

                <img src={avatar} className="w-32 h-auto"></img>
                <h1 className="text-2xl text-center max-w-xs"> Crea tu cuenta y comienza a ganar XP</h1>
                

            </div>
            
            <div className="flex flex-col gap-3 py-6 px-10 items-center justify-center bg-white rounded-2xl shadow-sm shadow-gray-500">

            
                <div className="flex flex-row items-center w-full">

                    <img src={avatar} className="w-32 h-auto"></img>

                    <h1 className="text-2xl text-center max-w-xs"> Crea tu cuenta y comienza a ganar XP</h1>
                    
                </div>
                
        
                    <div className="flex flex-col gap-2 px-5">

                        <label > Nombre </label>
                        <input onChange={catchUserData} name="name" placeholder="nombre" className="bg-[#1C212B] text-white text-md w-80 py-3 px-6 rounded-md "/>

                        <label > Nombre de Usuario </label>
                        <input onChange={catchUserData} name="userName" placeholder="Nombre de Usuario" className="bg-[#1C212B] text-white text-md w-80 py-3 px-6 rounded-md "/>
                        
                        <label> Email </label>
                        <input onChange={catchUserData} name="email" placeholder="Email" className="bg-[#1C212B] text-white text-md w-80 py-3 px-6 rounded-md "/>
                        <label> Contraseña </label>
                        <input onChange={catchUserData} name="password" type="password" placeholder="Contraseña" className="bg-[#1C212B] text-white text-md w-80 py-3 px-6 rounded-md "/>

                        <input onChange={catchUserData} name="conpasword" type="password" placeholder="Confirmar Contraseña" className="bg-[#1C212B] text-white text-md w-80 py-3 px-6 rounded-md "/>
                    </div> 
                    
                <div className="w-full flex justify-end pt-10">
                    
                    <button onClick={submitUserData} className="bg-[#457884] hover:bg-[#3E6973] text-white text-md py-2 px-7 rounded"> Registrarse</button>

                </div>

                <div className="flex flex-col justify-center items-center pt-10">

                    <p> ya tienes cuenta? 
                        
                        <a  onClick={toggleForm} className=" text-[#61DECA] hover:text-[#457884]"> Inicia sesion.</a>


                    </p>

                    </div>

        

            </div>
        </div>
    )    


}


export default Register