import React from "react"
import { useNavigate } from "react-router-dom";

interface LessonCardProps {

    title:string;
    QCount: number;

}

const LessonCard: React.FC<LessonCardProps> = ({title, QCount}) => {


    const navigate = useNavigate();


    return (

        <div className=" flex flex-col bg-white/50 w-60 h-40 items-center justify-center flex-shrink-0 rounded-lg" onClick={() => {navigate("/question")}}>

            <h1> {title} </h1>
            <h2> {QCount} </h2>

        </div>



    )

}


export default LessonCard