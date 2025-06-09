import React, { useState } from "react";

import Logo from "../assets/Ogloc logo 2.png"

import { useEffect } from "react";

import axios from "axios";

import { Flame, Activity, Trophy, Menu } from "lucide-react";

import UserButton from "./userButton";
import { useNavigate } from "react-router-dom";

import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface UserInfo {
    name:string
    username:string
    exp:number,
    days:number,
    ranking:number

}

/**
 * Componente navBar, es la barra que esta en la parte superior en la mayoria de las vitas
 * del prototipo.
 */
const NavBar: React.FC = () => {

    const [userInfo, setUserInfo] = useState<UserInfo>({
  name: "",
  username: "",
  exp: 0,
  days: 0,
  ranking: 0,
});

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchUserInfo = async () => {
    // 1. Recupera el token
    const token = localStorage.getItem('auth');
    if (!token) {
      console.warn('No se encontró token de autenticación');
      setLoading(false);
      return;
    }

    // 2. Configuración con el header Authorization
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    try {
      // 3. Petición enviando solo el config (sin cuerpo ni params)
      //    Uso GET por ser más semántico cuando no hay body.
      const userInfoRes = await axios.get<UserInfo>(
        "http://localhost:8000/userInfo",
        config
      );

      setUserInfo(userInfoRes.data);
    } catch (error) {
      console.error('Error al obtener userInfo:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchUserInfo();
}, []);


    return (
        <div className="flex flex-row justify-between items-center px-4 md:px-8 py-3 shadow-md shadow-gray-500">
            <SkeletonTheme baseColor="#2e788f" highlightColor="#444">
                {/* Logo y título */}
                <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
                    <img
                        src={Logo}
                        alt="Logo"
                        className="w-12 h-auto md:w-12 mr-2"
                    />
                    <h1 className="hidden md:block text-xl text-white">
                        English<br />&emsp;with Ogloc
                    </h1>
                </div>

             
                <div className="hidden md:flex gap-6 items-center">
                    <div className="flex items-center gap-2">
                        <Activity className="text-yellow-500" />
                        <span className="text-white font-semibold">
                            {loading ? <Skeleton width={50} /> : `${userInfo.exp} exp`}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Flame className="text-orange-500" />
                        <span className="text-white font-semibold">
                            {loading ? <Skeleton width={50} /> : `${userInfo.days} Dias`}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Trophy className="text-yellow-500" />
                        <span className="text-white font-semibold">
                            {loading ? <Skeleton width={50} /> : `#${userInfo.ranking}`}
                        </span>
                    </div>
                </div>

              
                <div className="md:hidden my-2">

                    <ul className="p-1 backdrop-blur-sm shadow-lg shadow-gray-500 rounded-lg w-full">
                        <li className="flex text-white justify-between py-1 px-3 gap-12 hover:bg-gray-700 transition-colors">
                            <span className="flex items-center gap-2">
                                <Activity className="text-yellow-500" size={18} />
                                EXP:
                            </span>
                            {loading ? <Skeleton width={40} /> : userInfo.exp}
                        </li>
                        <li className="flex text-white justify-between py-1 px-3 hover:bg-gray-700 transition-colors">
                            <span className="flex items-center gap-2">
                                <Flame className="text-orange-500" size={18} />
                                Días:
                            </span>
                            {loading ? <Skeleton width={40} /> : userInfo.days}
                        </li>
                        <li className="flex text-white justify-between py-1 px-3 hover:bg-gray-700 transition-colors">
                            <span className="flex items-center gap-2">
                                <Trophy className="text-orange-500" size={18} />
                                Ranking:
                            </span>
                            {loading ? <Skeleton width={40} /> : userInfo.ranking}
                        </li>
                    </ul>
                </div>

               
                <div className="flex items-center gap-3 md:gap-5">
                    <span className="hidden md:inline text-white text-sm md:text-lg truncate max-w-[120px] lg:max-w-[200px]">
                        {loading ? <Skeleton width={70} /> : userInfo?.username}
                    </span>
                    <UserButton userData={userInfo} setBadge= {loading}/>
                </div>
            </SkeletonTheme>
        </div>
    )
}



export default NavBar;