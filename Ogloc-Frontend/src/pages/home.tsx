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

import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";


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

                setLoading(false)


            }catch (error) {
                setError((error as Error).message);
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

                
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
               <div className="flex flex-row gap-5 min-w-full py-4 custom-scroll overflow-x-auto touch-pan-x" 

                              onMouseDown={(e) => {
                                const container = e.currentTarget;
                                container.dataset.isDragging = "true";
                                container.dataset.startX = e.clientX.toString();
                                container.dataset.scrollLeft = container.scrollLeft.toString();
                                container.style.cursor = 'grabbing';
                                e.preventDefault();
                              }}
                              onMouseMove={(e) => {
                                const container = e.currentTarget;
                                if (container.dataset.isDragging === "true") {
                                  const startX = parseFloat(container.dataset.startX || "0");
                                  const scrollLeft = parseFloat(container.dataset.scrollLeft || "0");
                                  container.scrollLeft = scrollLeft - (e.clientX - startX);
                                }
                              }}
                              onMouseUp={(e) => {
                                const container = e.currentTarget;
                                container.dataset.isDragging = "false";
                                container.style.cursor = 'grab';
                              }}
                              onMouseLeave={(e) => {
                                const container = e.currentTarget;
                                container.dataset.isDragging = "false";
                                container.style.cursor = 'grab';
                              }}
                              style={{ cursor: 'grab' }}>

                

                    {loading ?

                    (  <div className="flex flex-row gap-4">
                        {Array.from({ length: 6 }).map((_, index) => ( 
                          <div key={index} >
                            <Skeleton 
                              className="!w-60 !h-40 rounded-lg" // Si tus cards tienen bordes redondeados
                            />
                          </div>
                        ))}
                      </div>

                    )
                    : 
                    ( lessons.map((lesson) => (


                        <AnimationLayout>

                            <LessonCard key = {lesson.id} id = {lesson.id} title = {lesson.title} questions = {lesson.questions}></LessonCard>


                        </AnimationLayout>
                        
                    )))


                }
                


               </div>
               </SkeletonTheme>

               <div className="flex flex-col gap-6 items-center justify-center">

                <AnimationLayout>

                    <QuestionPool/>

                </AnimationLayout>


                <AnimationLayout>

                        <AvatarStoreCard/>

                </AnimationLayout>

                    

                    
                
                    
                    <Ranking players={player} loading = {loading}/>





               </div>


               

            </div>

        </MainLayout>


        
    )
}

export default Home