import React from "react";
import MainLayout from "../layout/mainLayout";

import Ogloc from "../assets/Ogloc logo 2.png"
import GandalfVerde from "../assets/rana-Ogloc.svg"
import Gustavf from "../assets/zorro ogloc.png"
import pinguinPunk from "../assets/pinguino Ogloc fixed.png"

interface StorePageProps {


    showNavBar: boolean
}


const StorePage: React.FC<StorePageProps> = ({showNavBar}) => {



    return (


        <MainLayout navBar = {showNavBar}>


            <div className="flex flex-col items-center justify-center gap-5">

                <img className="w-50 h-50 object-contain rounded-full p-2 border" src={Ogloc}/>

                <div className="flex flex-row items-center justify-between p-10 gap-7  rounded-xl bg-white/50">

                    <img className="w-40 h-40 object-contain rounded-full p-2 border" src={Ogloc}/>
                    <img className="w-40 h-40 object-contain rounded-full p-2 border" src={GandalfVerde}/>
                    <img className="w-40 h-40 object-contain rounded-full p-2 border" src={Gustavf}/>
                    <img className="w-40 h-40 object-contain rounded-full p-2 border" src={pinguinPunk}/>
                </div>

            </div>



        </MainLayout>

       


    )

}


export default StorePage;