import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";


import MainLayout from "../layout/mainLayout";

import AnimationLayout from "../layout/animationLayout";

import LessonCard from "../components/lessonCard";

import QuestionPool from "../components/QuestionPool";

import AvatarStoreCard from "../components/avatarStoreCard";

import Ranking from "../components/ranking";

import { data, useNavigate } from "react-router-dom";


interface HomeProps {

    showNavBar: boolean;

}

interface Lesson {

    id: string;
    title: string;
    questions: number;
}

interface Player {

    username: string,
    exp: number,
    dias: number
}


interface userInfo {

    username: string;
    exp: number;
    dias: number;
    ranking: number;

}

const Home: React.FC<HomeProps> = ({showNavBar})=>{

    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [player, setPlayer] = useState<Player[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const userId = localStorage.getItem("auth");

    console.log(userId);

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

                

               <div className="flex flex-row gap-5 custom-scroll py-4" 
                              onWheel={(e) => {
                                e.currentTarget.scrollLeft += e.deltaX;
                            }}>

                
                {lessons.map((lesson) => (


                    <AnimationLayout>

                        <LessonCard key = {lesson.id} id = {lesson.id} title = {lesson.title} questions = {lesson.questions}></LessonCard>


                    </AnimationLayout>
                    
                ))}


               </div>

               <div className="flex flex-col gap-6 items-center justify-center">

                <AnimationLayout>

                    <QuestionPool/>

                </AnimationLayout>


                <AnimationLayout>

                        <AvatarStoreCard/>

                </AnimationLayout>

                    

                    
                    

                    <Ranking players={player}/>





               </div>


               

            </div>

        </MainLayout>


        
    )
}

export default Home