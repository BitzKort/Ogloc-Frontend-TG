import React from "react";
import logo from '../assets/rana-Ogloc.svg';

const Footer : React.FC = () => {

    return (

    <div className="bg-[#61DECA] font-roboto text-lg text-white">

        <div className=" h-25 flex items-center justify-between">
        
            <h1 className="ml-10 text-2xl"> English with Ogloc</h1>
            <img src={logo} className="w-32 h-auto"></img>

            <div className="mr-10">
                <h2> Tulua, valle del cauca</h2>
                <h2> miguel.angel.rivera@correounivalle.edu.co</h2>
            </div>

        </div>

        <hr/>

        <div className="h-15 flex items-center justify-between">

            <div className="ml-10 flex gap-3">

                <h3> About</h3>
                <h3> Contact</h3>
                <h3> GitHub</h3>
                <h3> LinkedIn</h3>
                    
            </div>
            <h3 className="mr-17">© 2025 Ogloc Corp. All rights reserved</h3>
            


        </div>

        
         

    </div>

    )

}


export default Footer