import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut } from 'lucide-react';

import Zorro from "../assets/zorro ogloc.png";
import { useNavigate } from 'react-router-dom';

function UserButton() {
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
    // Add logout logic here

    localStorage.removeItem('auth');
    navigate("/Auth")
    console.log('Logging out...');
  };

  return (
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center focus:outline-none cursor-pointer"
            >
              <img
                src={Zorro}
                alt="Profile"
                className="h-15 w-15 rounded-full object-cover border-2 border-gray-200 cursor-pointer"
              />
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
          </div>
  );
}

export default UserButton;