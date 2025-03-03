import React from "react";

import Logo from "../assets/Ogloc logo 2.png"

const QuestionPool: React.FC = () => {

    return (
        <div className="flex flex-col items-center justify-center border mx-50 sm:mx-40 md:mx-50 lg:mx-50 xl:mx-50">

            <img className="w-30 h-30 object-contain" src = {Logo}></img>
            <h1 className="ml-10 text-2xl whitespace-normal items-center justify-center"> Gana experiencia resolviendo <br />  las preguntas que has fallado en los módulos </h1>

        </div>


    )

}


export default QuestionPool;