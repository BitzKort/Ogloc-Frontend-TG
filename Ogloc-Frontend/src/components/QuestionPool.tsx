import React from "react";

import Logo from "../assets/Ogloc logo 2.png"

import { useNavigate } from "react-router-dom";

const QuestionPool: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center bg-[#61DECA]/60 min-w-full py-8 sm:px-15 md:px-30 lg:px-100 rounded-lg" onClick={() => {navigate("/question")}}>

            <img className="w-30 h-30 object-contain" src = {Logo}></img>
            <h1 className="text-2xl whitespace-normal"> Gana experiencia resolviendo </h1>
            <h1 className="text-2xl whitespace-normal"> las preguntas que has fallado en los módulos </h1>

        </div>


    )

}


export default QuestionPool;