import React, { use } from "react";

import Logo from "../assets/Ogloc logo 2.png"

import { useEffect } from "react";

import axios from "axios";

import { Flame, Activity, Trophy } from "lucide-react";

import UserButton from "./userButton";
import { useNavigate } from "react-router-dom";

interface userInfo {

    username:string
    exp:number,
    dias:number,
    ranking:number

}



const NavBar: React.FC = () => {


    const navigate = useNavigate();



    return (

        <div className="flex flex-row gap-3 justify-between min-w-full py-2 items-center shadow-md shadow-gray-500">

            <h1 className="ml-10 text-2xl whitespace-normal text-white cursor-pointer p-2" onClick={() => navigate("/")}> English <br /> &emsp;  with Ogloc</h1>

            <div className="flex flex-row gap-8 items-center">

                <div className=" flex flex-row gap-2">

                    <Activity className="text-orange-500"/>
                    <h1 className="text-white font-semibold">123 exp</h1>
                </div>

                <div className=" flex flex-row gap-2">

                    <Flame className="text-orange-500"/>
                    <h1 className="text-white font-semibold">45 dias</h1>
                </div>

                <div className=" flex flex-row gap-2">

                    <Trophy className="text-orange-500"/>
                    <h1 className="text-white font-semibold">#12</h1>
                </div>
                
   
            
            </div>

        
            <div className="flex flex-row gap-5 items-center mx-10">

            <h1 className="text-white  text-lg"> bitzkort</h1>
            
            <UserButton></UserButton>

            </div>
           


        

        </div>
    )



}



export default NavBar;