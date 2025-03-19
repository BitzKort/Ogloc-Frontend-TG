import React, { useEffect, useState } from "react";
import MainLayout from "../layout/mainLayout";

import { useParams } from "react-router-dom";

import Pinguin from "../assets/pinguino Ogloc fixed.png";

import { DoorOpen, Mic, Send} from "lucide-react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

interface QuestionPageProps {

    showNavBar: boolean
}

interface lesson {
    id: number
    title: string
    text: string
    questions: string
}

const QuestionPage: React.FC<QuestionPageProps> =({showNavBar}) => {

    const {id} = useParams();
    const navigate = useNavigate();

    console.log(id);

    const [lessonInfo, setLessonInfo] = useState<lesson>({

        id: 0,
        title: "",
        text: "",
        questions: ""
    });


    useEffect(() =>{


        const getLesson = async () => {



            const lessonRes = await axios.get<lesson>("http://localhost:8000/lesson",
                 { params: {
                id:id,
            }})

            console.log(lessonRes.data)


            setLessonInfo(lessonRes.data);
    
        }

        getLesson();

        

        },[])




    return (

        <MainLayout navBar = {showNavBar}>


            <div className="flex-col min-w-full "> 

                <div className=" flex flex-col justify-center items-center ">
                    <span className=" text-xl font-semibold text-white left-1/2">{lessonInfo.title}</span>
                    <span className=" text-xl font-semibold text-white left-1/2">1/{lessonInfo.questions}</span>

                </div>

                <div className="flex flex-row min-w-full items-center justify-around py-4 px-15">

                    <div  className="self-start max-w-xl    text-white  bg-[#444444] rounded-xl p-5"> {lessonInfo.text}</div>

                    
                    <div className="max-w-md flex self-start flex-col p-5 gap-6 rounded-xl bg-[#444444]">

                        <p className="text-white"> {lessonInfo.questions} </p>

                        <input className="p-5 m-5 border bg-white/70 rounded-xl" placeholder="espacio para la respuesta"></input>


                        <div className="flex flex-row justify-between">


                           <button
                                
                                className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-[#61DECA]/60  shadow-sm hover:shadow-gray-600"
                                >
                                <Send className="h-4 w-4" />
                                <span>Enviar</span>
                            </button>

                            <button
                                
                                className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-full hover:text-[#61DECA]/60 shadow-sm hover:shadow-gray-600"
                                >
                                <Mic className="h-8 w-8" />
                            </button>


                        </div>
                        
 


                    </div>
                    
                </div>

                <div className=" relative flex items-center p-5 m-10 ">
                    <img src = {Pinguin} className="absolute left-1/3 w-30 object-contain "/>


                </div>

                <button
                           onClick={()=>navigate("/")}
                           className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-[#FF0000]/60  shadow-sm hover:shadow-gray-600"
                           >
                           <DoorOpen className="h-4 w-4" />
                           <span>Salir de la leccion</span>
                       </button>               

            </div>



        </MainLayout>

        


    )
}


export default QuestionPage;