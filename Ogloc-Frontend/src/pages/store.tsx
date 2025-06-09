import React, { useState } from "react";
import MainLayout from "../layout/mainLayout";

import Ogloc from "../assets/Ogloc logo 2.png"
import GandalfVerde from "../assets/rana-Ogloc.svg"
import Gustavf from "../assets/zorro ogloc.png"
import pinguinPunk from "../assets/pinguino Ogloc fixed.png"

import Avatar from "../components/avatarComponent";

interface StorePageProps {


    showNavBar: boolean
}


interface AvatarCard {

    avatarImage: string
    avatarName: string
    exp: number
    state: string

}


const StorePage: React.FC<StorePageProps> = ({showNavBar}) => {

    const avatarOgloc: AvatarCard = {
        avatarImage: Ogloc,
        avatarName: "Ogloc",
        exp: 2500,
        state: "Legendario",
    };
    
    const avatarGandalfVerde: AvatarCard = {
        avatarImage: GandalfVerde,
        avatarName: "Gandalf Verde",
        exp: 1800,
        state: "Místico",
    };
    
    const avatarGustavf: AvatarCard = {
        avatarImage: Gustavf,
        avatarName: "Gustavf",
        exp: 1500,
        state: "Épico",
    };
    
    const avatarPinguinPunk: AvatarCard = {
        avatarImage: pinguinPunk,
        avatarName: "Pinguin Punk",
        exp: 1000,
        state: "Raro",
    };

    const [selectedAvatar, setSelectedAvatar] = useState<AvatarCard>(avatarOgloc);

    const stateColor = () =>{

        switch(selectedAvatar.state){

            case "Legendario":
                return "text-yellow-500";
            case "Místico":
                return "text-green-500";
            case "Épico":
                return "text-blue-500";
            case "Raro":
                return "text-purple-500";
        }

    }

    return (


        <MainLayout navBar = {showNavBar}>


            <div className="flex flex-row items-start min-w-full">

                <div className="flex flex-row items-center justify-between p-5 rounded-xl bg-white/50">

                    <Avatar onSelect={() => setSelectedAvatar(avatarOgloc)} avatarInfo={avatarOgloc} ></Avatar>
                    <Avatar onSelect={() => setSelectedAvatar(avatarGandalfVerde)} avatarInfo={avatarGandalfVerde}></Avatar>
                    <Avatar onSelect={() => setSelectedAvatar(avatarGustavf)} avatarInfo={avatarGustavf}></Avatar>
                    <Avatar onSelect={() => setSelectedAvatar(avatarPinguinPunk)} avatarInfo={avatarPinguinPunk}></Avatar>
                    
                </div>
                
                <div className="flex flex-col w-1/3 text-white self-center justify-center items-center p-5">

                    <img className="w-50 h-50 object-contain rounded-full p-2 border" src={selectedAvatar.avatarImage}/>
                    <span> @{selectedAvatar.avatarName}</span>
                    <span>{selectedAvatar.exp} exp</span>
                    <span className={stateColor()}>{selectedAvatar.state}</span>
                    <span> descipcion del personaje</span>

                </div>

                

            </div>



        </MainLayout>

       


    )

}


export default StorePage;