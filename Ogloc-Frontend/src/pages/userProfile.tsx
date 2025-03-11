import React from "react";
import MainLayout from "../layout/mainLayout";

import AvatarMuestra from "../assets/rana-Ogloc.svg"


import { Flame, Activity, Edit2, Trophy} from "lucide-react";

interface UserPorileProps {

    showNavBar: boolean
}


const UserProfile: React.FC<UserPorileProps> = ({showNavBar}) =>{


    return (

        <MainLayout navBar ={showNavBar}>


            <div className="flex flex-col gap-4 shadow-md shadow-black/50 rounded-xl p-5">
                <div className="flex flex-row gap-4 items-center">

                    <img className="w-50 h-50 rounded-full object-contain border border-white/50" src = {AvatarMuestra} alt ="avatar del usuario"></img>

            
                    <div className="flex flex-col text-lg text-white font-semibold justify-start">

                        <span> Miguel Rivera</span>
                        <span>@BitzKort</span>

                    </div>

                    <button
                           
                            className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-[#61DECA]/60  shadow-sm hover:shadow-gray-600"
                            >
                            <Edit2 className="h-4 w-4" />
                            <span>Editar Perfil</span>
                        </button>

                    
                    
                </div>

                <div className="flex flex-row items-center justify-center gap-4">

                    <div className="bg-white/40 rounded-xl p-6 border border-white">
                    <div className="flex items-center gap-2 mb-4">
                    <Flame className="h-6 w-6 text-orange-500" />
                    <h2 className="text-xl font-semibold text-white">Racha</h2>
                    <span className="text-5xl font-bold text-orange-500">14</span>
                    <div className="flex flex-col">
                        <span className="text-orange-200">días</span>
                        <span className="text-orange-300 text-sm">consecutivos</span>
                    </div>

                    </div>
                    </div>

                    <div className="bg-white/40 rounded-xl p-6 border border-white">
                    <div className="flex items-center gap-2 mb-4">
                    <Activity className="h-6 w-6 text-yellow-500" />
                    <h2 className="text-xl font-semibold text-white">Experiencia</h2>
                    <span className="text-5xl font-bold text-yellow-500">143</span>
                    <span className="text-orange-200">exp</span>


                    </div>
                    </div>
                    
                </div>

                <div className="flex bg-white/40 rounded-xl p-6 border border-white items-center justify-center">
                    <div className="flex items-center gap-2 mb-4">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                    <h2 className="text-xl font-semibold text-white">Ranking</h2>
                    <span className="text-5xl font-bold text-yellow-500">#15</span>
                    </div>
                </div>


                
    
            </div>




        </MainLayout>



    )
}

export default UserProfile;