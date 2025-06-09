import React from "react"
import { useNavigate } from "react-router-dom";

interface LessonCardProps {
    
    id:string;
    title:string;
    questions: number;

}



/**
 * Componente de carta de las lecciones, este componente es el encargado
 * individual de mostrar la informacion general de una leccion a la vez.
 */
const LessonCard: React.FC<LessonCardProps> = ({id, title, questions}) => {


    const navigate = useNavigate();


    return (

        <div className=" flex flex-col bg-white/50 w-60 h-40 items-center justify-between mx-2 py-6 rounded-lg" onClick={() => {navigate(`/question/${id}`)}}>

                <span className="font-semibold text-center text-lg"> {title} </span>

                <div className="flex flex-row min-w-full pr-4 justify-end">

                    <span className="italic"> {questions} preguntas</span>

                </div>
                




            
        </div>



    )

}


export default LessonCard