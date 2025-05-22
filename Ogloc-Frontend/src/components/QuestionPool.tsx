import React from "react";

import Logo from "../assets/Ogloc logo 2.png"

import { useNavigate } from "react-router-dom";

const QuestionPool: React.FC = () => {

    const navigate = useNavigate();

    return (
<div
      onClick={() => navigate('/question')}
      className={` flex flex-col items-center justify-center bg-[#61DECA]/60 w-full py-8 px-4 sm:px-8 md:px-16 lg:px-60 rounded-lg cursor-pointer
                    transition-transform duration-200
                    hover:scale-[1.02]`}
    >
      <img
        src={Logo}
        alt="Logo"
        className=" w-18 object-contain mb-4"
      />
      <h1 className="text-xl sm:text-xl md:text-2xl text-center leading-snug">
        Gana experiencia resolviendo
      </h1>
      <h1 className="text-xl sm:text-xl md:text-2xl text-center leading-snug">
        las preguntas que has fallado en los módulos
      </h1>
    </div>
  );
};



export default QuestionPool;