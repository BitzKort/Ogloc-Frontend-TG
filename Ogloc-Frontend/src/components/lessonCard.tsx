import React from "react"
import { useNavigate } from "react-router-dom";

interface LessonCardProps {
    
    id:string;
    title:string;
    questions: number;

}

const LessonCard: React.FC<LessonCardProps> = ({id, title, questions}) => {


    const navigate = useNavigate();


    return (

        <div className=" flex flex-col bg-white/50 w-60 h-40 items-center justify-between mx-2 py-6 rounded-lg" onClick={() => {navigate(`/question/${id}`)}}>

                <h1 className="font-semibold text-lg"> {title} </h1>

                <div className="flex flex-row min-w-full pr-4 justify-end">

                    <h2 className="italic"> {questions} preguntas</h2>

                </div>
                




            
        </div>



    )

}


export default LessonCard