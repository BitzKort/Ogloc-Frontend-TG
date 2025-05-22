import React, { useState, useEffect} from "react";
import MainLayout from "../layout/mainLayout";

import AvatarMuestra from "../assets/rana-Ogloc.svg"

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Flame, Activity, Edit2, Trophy} from "lucide-react";

interface UserPorileProps {

    showNavBar: boolean
}


interface UserInfo {
    name:string
    username:string
    exp:number,
    days:number,
    ranking:number

}



const UserProfile: React.FC<UserPorileProps> = ({ showNavBar }) => {

    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: "",
        username: "",
        exp: 0,
        days: 0,
        ranking: 0,
    });

    const navigate = useNavigate();

      const onChangePassword = () => {
    // Aquí puedes abrir un modal, navegar a la ruta de cambio de contraseña, etc.
    // Por ejemplo, si tienes una ruta dedicada:
    navigate('/change-password');
  };

  const onEditProfile = () => {
    // Aquí puedes navegar al formulario de edición de perfil
    navigate('/profile/edit');
  };




    useEffect(() => {
    const fetchUserInfo = async () => {
        // 1. Recupera el token
        const token = localStorage.getItem('auth');
        if (!token) {
        console.log('No se encontró token de autenticación');
        navigate("/auth");
        return;
        }

        // 2. Configuración con el header Authorization
        const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
        };

        try {

        const userInfoRes = await axios.get<UserInfo>(
            "http://localhost:8000/userInfo",
            config
        );

        console.log(userInfoRes.data)
        setUserInfo(userInfoRes.data);
        } catch (error) {
        console.error('Error al obtener userInfo:', error);
        }
    };

  fetchUserInfo();
}, []);

    return (

        <MainLayout navBar ={showNavBar}>


           <div className="flex flex-col gap-4 p-5 rounded-xl shadow-md shadow-black/50  w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <img
          src={AvatarMuestra}
          alt="Avatar del usuario"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border border-white/50"
        />
        <div className="flex-1 flex flex-col text-lg sm:text-xl text-white font-semibold gap-1">
          <span>{userInfo.name}</span>
          <span className="text-gray-300 text-sm sm:text-base">@{userInfo.username}</span>
          <button
            onClick={onChangePassword}
            className="text-sm text-[#61DECA] hover:underline text-left"
          >
            Cambiar contraseña
          </button>
        </div>
        <button
          onClick={onEditProfile}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-[#61DECA]/60 shadow-sm hover:shadow-gray-600"
        >
          <Edit2 className="h-4 w-4" />
          <span className="text-sm sm:text-base">Editar Perfil</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Racha */}
        <div className="flex flex-col bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-orange-500" />
            <h2 className="text-lg font-semibold text-white">Racha</h2>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl sm:text-5xl font-bold text-orange-500">
              {userInfo.days}
            </span>
            <div className="flex flex-col">
              <span className="text-orange-200 text-sm">días</span>
              <span className="text-orange-300 text-xs">consecutivos</span>
            </div>
          </div>
        </div>

        {/* Experiencia */}
        <div className="flex flex-col bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-yellow-500" />
            <h2 className="text-lg font-semibold text-white">Experiencia</h2>
          </div>
          <span className="text-4xl sm:text-5xl font-bold text-yellow-500 mt-2">
            {userInfo.exp}
          </span>
          <span className="text-yellow-200 text-sm">exp</span>
        </div>

        {/* Ranking */}
        <div className="flex flex-col bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 items-center">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <h2 className="text-lg font-semibold text-white">Ranking</h2>
          </div>
          <span className="text-4xl sm:text-5xl font-bold text-yellow-500 mt-2">
            {userInfo.ranking === 0 ? '-' : `#${userInfo.ranking}`}
          </span>
        </div>
      </div>
    </div>




        </MainLayout>



    )
}

export default UserProfile;