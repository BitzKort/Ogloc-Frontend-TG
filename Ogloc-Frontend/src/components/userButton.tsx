import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Ogloc from "../assets/Ogloc logo 2.png";
import MagicMan from "../assets/rana-Ogloc.svg";
import ElegantFox from "../assets/zorro ogloc.png";
import Penguin from "../assets/pinguino Ogloc fixed.png";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


interface UserInfo {
  name: string;
  username: string;
  exp: number;
  days: number;
  ranking: number;
}

interface UserButtonProps{

  userData: UserInfo;
  setBadge:boolean;

}


const UserButton:React.FC<UserButtonProps> = ({userData, setBadge}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);


  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {

    localStorage.removeItem('auth');
    navigate("/Auth")
  };

  return (

          <div className="relative">
            <SkeletonTheme baseColor="#2e788f" highlightColor="#444">
            <button
              ref={buttonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center focus:outline-none cursor-pointer"
            >
              {setBadge ? (
              <Skeleton width={40} height={40} circle />
            ) : (
              <img
                src={
                  userData.exp < 50 ? Ogloc :
                    userData.exp < 100 ? MagicMan :
                      userData.exp < 150 ? ElegantFox :
                        Penguin
                }
                alt="Avatar actual"
                className="w-17 h-17 mx-1 rounded-full object-contain border border-white/50"
              />
            )}
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div 
                ref={menuRef}
                className="absolute backdrop-blur-lg right-0 mt-2 w-48 rounded-md shadow-lg z-10 border border-gray-200"
              >
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-white rounded-md hover:text-black hover:bg-gray-100 cursor-pointer"
                >
                  <User className="h-4 w-4 mr-2 text-white"/>
                  Mi Perfil
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-white rounded-md hover:bg-red-500 cursor-pointer"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </button>
              </div>
            )}
          </SkeletonTheme>
          </div>
  );
}

export default UserButton;