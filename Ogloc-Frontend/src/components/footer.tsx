import React from "react";
import logo from '../assets/rana-Ogloc.svg';

import { LocateFixed, Mail, Github } from "lucide-react";
const Footer : React.FC = () => {

    return (

    <div className="bg-[#61DECA]/60 font-roboto text-lg text-white">

        <div className=" h-25 flex items-center justify-between mx-10">
        
            <div className="flex flex-row gap-4 items-center justify-center">


                <h1 className=" text-2xl whitespace-normal"> English <br /> &emsp;  with Ogloc</h1>
                <img src={logo} className="w-32 h-32 object-contain"></img>

            </div>
            
            <div>

                <div className="flex flex-row gap-4">

                    <LocateFixed className="text-white"/>
                    <h2> Tulua, valle del cauca</h2>
                    
                </div>

                <div className="flex flex-row gap-4">

                    <Mail className="text-white"/>
                    <h2> miguel.angel.rivera@correounivalle.edu.co</h2>

                </div>
                
                
                
            </div>

        </div>

        <hr/>

        <div className="h-15 flex items-center justify-between mx-10">

            <div className="flex gap-3">

                <h3> About</h3>
                <h3> Contact</h3>

                <div className="flex flex-row  gap-1">

            
                <h3> GitHub</h3>
                </div>
                
                <h3> LinkedIn</h3>
                    
            </div>
            <h3 >© 2025 Ogloc Corp. All rights reserved</h3>
            


        </div>

        
         

    </div>

    )

}


export default Footer