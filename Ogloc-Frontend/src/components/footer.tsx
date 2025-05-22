import React from "react";
import logo from '../assets/rana-Ogloc.svg';
import { LocateFixed, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <div className="bg-[#61DECA]/60 font-roboto text-white w-full">
      <div className="container mx-auto sm:px-4">
        {/* Primera sección */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-2">
          {/* Logo y título */}
          <div className="flex items-center gap-4 flex-1 min-w-[300px]">
            <div className="flex flex-col items-end">
              <h1 className="text-sm md:text-lg whitespace-nowrap">English <br /> &emsp; with Ogloc</h1>
            </div>
            <img 
              src={logo} 
              className="w-16 h-16 md:w-24 md:h-24 object-contain" 
              alt="Logo Ogloc"
            />
          </div>

          {/* Información de contacto */}
          <div className="flex flex-col gap-2 flex-1 md:text-right min-w-[300px]">
            <div className="flex items-center md:justify-end gap-2">
              <LocateFixed className="text-white shrink-0" />
              <span className="text-sm md:text-lg">Tulua, valle del cauca</span>
            </div>
            <div className="flex items-center md:justify-end gap-2">
              <Mail className="text-white shrink-0" />
              <span className="text-sm md:text-lg whitespace-nowrap">
                englishwithogloc@gmail.com
              </span>
            </div>
          </div>
        </div>

        <hr className="border-white/30 mb-4 w-full" />

        {/* Segunda sección */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="#" className="hover:text-gray-200 transition-colors">About</a>
            <a href="#" className="hover:text-gray-200 transition-colors">Contact</a>
            <a href="#" className="hover:text-gray-200 transition-colors">GitHub</a>
            <a href="#" className="hover:text-gray-200 transition-colors">LinkedIn</a>
          </div>
          
          <p className="text-sm text-center md:text-right whitespace-nowrap">
            © 2025 Ogloc Corp. All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;