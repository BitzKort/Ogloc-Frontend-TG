import React from "react";
import Ogloc from "../assets/Ogloc logo 2.png"
import GandalfVerde from "../assets/rana-Ogloc.svg"
import Gustavf from "../assets/zorro ogloc.png"
const AvatarStoreCard: React.FC = () => {

    return (

        <div className="flex flex-col gap-2 border items-center justify-center mx-50 sm:mx-40 md:mx-50 lg:mx-50 xl:mx-50">

            <div className="flex flex-row gap -3  items-center">
                <img className="object-contain w-30 h-30 " src={Ogloc}></img>
                <img className="object-contain w-30 h-30 " src={GandalfVerde}></img>
                <img className="object-contain w-30 h-30 " src={Gustavf}></img>
                
            </div>

            <h1 className="ml-10 text-2xl"> Consigue puntos de experiencia para cambiar a tu avatar</h1>

        </div>

        

    )
}


export default AvatarStoreCard;