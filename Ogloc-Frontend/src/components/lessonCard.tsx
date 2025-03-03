import React from "react"

interface LessonCardProps {

    title:string;
    QCount: string;

}

const LessonCard: React.FC<LessonCardProps> = ({title, QCount}) => {


    return (

        <div className=" flex flex-col bg-[#DA292C] w-60 h-40 items-center justify-center flex-shrink-0 rounded-lg">

            <h1> {title} </h1>
            <h2> {QCount} </h2>

        </div>



    )

}


export default LessonCard