import React, { useState } from "react";
import MainLayout from "../layout/mainLayout";
import { useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import LessonCard from "../components/lessonCard";

import QuestionPool from "../components/QuestionPool";

import AvatarStoreCard from "../components/avatarStoreCard";

import Ranking from "../components/ranking";

import { useNavigate } from "react-router-dom";


interface HomeProps {

    showNavBar: boolean;

}

interface Lesson {

    id: string;
    title: string;
    quesitons: number;
}

interface Player {

    username: string,
    exp: number,
    dias: number
}

const Home: React.FC<HomeProps> = ({showNavBar})=>{

    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [player, setPlayer] = useState<Player[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {

            try{


                const [rankingRes, lessonsRes] = await Promise.all([
                    axios.get<Player[]>("http://localhost:8000/ranking"),
                    axios.get<Lesson[]>("http://localhost:8000/lessons"),
                  ]);

                setLessons(lessonsRes.data);
                setPlayer(rankingRes.data);



            }catch (error) {
                setError((error as Error).message);
              } finally {
                setLoading(false);
              }

        }
        
        fetchData();
    }, []);



    return (


        <MainLayout navBar={showNavBar} >

            <div className="flex flex-col gap-6 min-w-full min-h-full">

                <div className=" w-200 bg-[#00FFFF50]" 
                     style={{
                        clipPath: "polygon(0% 0%, 80% 0%, 95% 100%, 0% 100%)"
                }}>

                    <h1 className="text-3xl font-bold text-white m-2"> Modulos <br /> &emsp;  de preguntas</h1>

                </div>

                

               <div className="flex flex-row gap-5 overflow-x-auto custom-scroll" 
                              onWheel={(e) => {
                                e.currentTarget.scrollLeft += e.deltaY;
                            }}>

                
                {lessons.map((lesson) => (
                    
                    <LessonCard key = {lesson.id} title = {lesson.title} QCount = {lesson.quesitons}></LessonCard>
                ))}


               </div>

               <div className="flex flex-col gap-6 items-center justify-center">

                <motion.div 
                        animate ={{y: [-5, 5]}}
                        whileHover={{
                            y: [-5, 5],  // Movimiento flotante
                            transition: { repeat: Infinity, repeatType: "reverse", duration: 1.5, ease: "easeInOut" },
                            scale: 1.1,   // Efecto de escala al pasar el mouse
                            }}
                        
                        
                    >


                        <QuestionPool/>


                    </motion.div>

                    <motion.div 
                        animate ={{y: [-5, 5]}}
                        whileHover={{
                            y: [-5, 5],  // Movimiento flotante
                            transition: { repeat: Infinity, repeatType: "reverse", duration: 1.5, ease: "easeInOut" },
                            scale: 1.1,   // Efecto de escala al pasar el mouse
                            }}
                        
                        
                    >


                        <AvatarStoreCard/>


                    </motion.div>

                    

                    
                    

                    <Ranking players={player}/>





               </div>


               

            </div>

        </MainLayout>


        
    )
}

export default Home