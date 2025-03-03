import React from "react";
import avatar from "../assets/zorro ogloc.png"
import { useState } from "react";
import axios from "axios";

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

                console.log(userData)

                const response = await axios.post("http://localhost:8000/register", userData);

                console.log(response)

            }catch(err) {

                console.log("algo salio mal en el registro")
                console.log(err)
            }
        }

    }

    return (

        <div className="flex flex-row items-center ">

            <div className="flex flex-col items-center justify-center w-full h-full py-70 px-10 bg-[#457884] rounded-2xl shadow-sm shadow-gray-500">

                <img src={avatar} className="w-32 h-auto "></img>
                <h1 className="text-2xl text-center max-w-xs"> Crea tu cuenta y comienza a ganar XP</h1>
                

            </div>
            
            <div className="flex flex-col gap-3 py-6 px-10 items-center justify-center bg-white rounded-2xl shadow-sm shadow-gray-500">

            
                <div className="flex flex-row items-center w-full">

                    <img src={avatar} className="w-32 h-auto"></img>

                    <h1 className="text-2xl text-center max-w-xs"> Crea tu cuenta y comienza a ganar XP</h1>
                    
                </div>
                
        
                    <div className="flex flex-col gap-2 px-5">

                        <label > Nombre </label>
                        <input onChange={catchUserData} value ={valuesRegister.name} name="name" placeholder="nombre" className="bg-[#1C212B] text-white text-md w-80 py-3 px-6 rounded-md "/>

                        <label > Nombre de Usuario </label>
                        <input onChange={catchUserData} value ={valuesRegister.username} name="username" placeholder="Nombre de Usuario" className="bg-[#1C212B] text-white text-md w-80 py-3 px-6 rounded-md "/>
                        
                        <label> Email </label>
                        <input onChange={catchUserData} value ={valuesRegister.email} name="email" placeholder="Email" className="bg-[#1C212B] text-white text-md w-80 py-3 px-6 rounded-md "/>
                        <label> Contraseña </label>
                        <input onChange={catchUserData} value ={valuesRegister.password} name="password" type="password" placeholder="Contraseña" className="bg-[#1C212B] text-white text-md w-80 py-3 px-6 rounded-md "/>

                        <input name="confirmPassword" type="password" placeholder="Confirmar Contraseña" className="bg-[#1C212B] text-white text-md w-80 py-3 px-6 rounded-md "/>
                    </div> 
                    
                <div className="w-full flex justify-end pt-10">
                    
                    <button onClick={submitUserData} className="bg-[#457884] hover:bg-[#3E6973] text-white text-md py-2 px-7 rounded"> Registrarse</button>

                </div>

                <div className="flex flex-col justify-center items-center pt-10">

                    <p> ya tienes cuenta? 
                        
                        <a  onClick={algo} className=" text-[#61DECA] hover:text-[#457884]"> Inicia sesion.</a>


                    </p>

                    </div>

        

            </div>
        </div>
    )    


}


export default Register