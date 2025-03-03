import React from "react";

import Logo from "../assets/Ogloc logo 2.png"


const NavBar: React.FC = () => {

    return (

        <div className="flex felx-row gap-3 min-w-full justify-between items-center border ">

            <img className ="w-20 h-20 object-contain border"src={Logo}></img>

            <button> Inicio</button>
            <button> Entrena </button>
            <button> Tienda </button>
            <button> Ranking</button>

            <img className = "w-20 h-20 object-contain" src={Logo}></img>


        

        </div>
    )



}



export default NavBar;