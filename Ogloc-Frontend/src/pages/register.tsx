import React from "react";
import avatar from "../assets/zorro ogloc.png"

interface RegisterProps {

    toggleForm: () => void;
}

const Register: React.FC<RegisterProps> = ({toggleForm}) => {

    return (


            <div className="flex flex-col gap-3 p-6 items-center justify-center bg-white rounded-2xl">


                <div className="flex flex-row items-center w-full">

                    <img src={avatar} className="w-32 h-auto"></img>

                    <h1 className="text-2xl text-center max-w-xs"> Crea tu cuenta y comienza a ganar XP</h1>
                    
                </div>
                
                

               <div className="flex flex-row gap-3 ">

                    <div className="flex flex-col gap-15 ">

                        <label className="pt-2"> Nombre </label>
                        <label className="pt-2"> Nombre de Usuario </label>
                        <label> Email </label>
                        <label className="pt-12"> Contraseña </label>
                        
                    </div>

                    <div className="flex flex-col gap-10">

                        <input placeholder="nombre" className="bg-[#1C212B] text-white text-md w-80 py-3 px-6 rounded-md "/>

                        <input placeholder="Nombre de Usuario" className="bg-[#1C212B] text-white text-md w-80 py-3 px-6 rounded-md "/>

                        <input placeholder="Email" className="bg-[#1C212B] text-white text-md w-80 py-3 px-6 rounded-md "/>

                        <input placeholder="Contraseña" className="bg-[#1C212B] text-white text-md w-80 py-3 px-6 rounded-md "/>

                        <input placeholder="Confirmar Contraseña" className="bg-[#1C212B] text-white text-md w-80 py-3 px-6 rounded-md "/>
                    </div> 


               </div>
                    
                <div className="w-full flex justify-end pt-10">
                    
                    <button onClick={toggleForm} className="bg-[#457884] hover:bg-[#3E6973] text-white text-md py-2 px-7 rounded"> Registrarse</button>

                </div>

        

            </div>
    )    


}


export default Register