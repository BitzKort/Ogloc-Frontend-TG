import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import MainLayout from "../layout/mainLayout";

import AnimationLayout from "../layout/animationLayout";

import LessonCard from "../components/lessonCard";

import QuestionPool from "../components/QuestionPool";

import BadgeCard from "../components/badgesCard";

import Ranking from "../components/ranking";


import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

import { useNavigate } from "react-router-dom";

interface HomeProps {

  showNavBar: boolean;

}


interface Lesson {
  id: string;
  title: string;
  question_count: number;
}

interface Lessons {
  status: string;
  pending_lessons: Lesson[];
  total_pending: number
}

interface Player {

  username: string,
  exp: number,
  days: number
}


interface userInfo {

  username: string;
  exp: number;
  days: number;
  ranking: number;

}

const Home: React.FC<HomeProps> = ({ showNavBar }) => {

  const [lessons, setLessons] = useState<Lessons>({
    status: "",
    pending_lessons: [],
    total_pending: 0,
  });
  const [player, setPlayer] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Recupera el token del localStorage
        const token = localStorage.getItem("auth");
        if (!token) {
          console.warn('No se encontró token de autenticación');
          navigate("/auth");
          return;
        }

        // 2. Crea la configuración con el header Authorization
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // 3. Lanza las dos peticiones en paralelo
        const [rankingRes, lessonsRes] = await Promise.all([
          axios.get<Player[]>("http://localhost:8000/ranking", config),
          axios.get<Lessons>("http://localhost:8000/AllLessons", config),
        ]);

        // 4. Guarda resultados en el estado
        setLessons(lessonsRes.data);
        setPlayer(rankingRes.data);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message);

      }
    };

    fetchData();
  }, []);



  return (


    <MainLayout navBar={showNavBar} >

      <div className=" flex flex-col gap-6 w-full h-full p-4">
        <div
          className={`
                    bg-[#00FFFF50] 
                    w-full 
                    lg:w-1/2 
                    [clip-path:polygon(0%_0%,80%_0%,95%_100%,0%_100%)]
                    transition-all duration-300
                  `}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white p-4">
            Lecciones <br />&emsp;de preguntas
          </h1>
        </div>


        <SkeletonTheme baseColor="#2e788f" highlightColor="#444">
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

              (<div className="flex flex-row gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} >
                    <Skeleton
                      className="!w-60 !h-40 rounded-lg"
                    />
                  </div>
                ))}
              </div>

              )
              :
              (
                lessons.total_pending === 0 ? (
                  <div className="w-full flex items-center justify-center p-6">
                    <p className="text-white text-center">
                      No hay lecciones por el momento, vuelve en 24 horas <br />
                      o revisa tu pool de preguntas incorrectas.
                    </p>
                  </div>
                ) : (
                  lessons.pending_lessons.map((lesson) => (
                    <AnimationLayout key={lesson.id}>
                      <LessonCard
                        id={lesson.id}
                        title={lesson.title}
                        questions={lesson.question_count}
                      />
                    </AnimationLayout>
                  ))
                )
              )}



          </div>
        </SkeletonTheme>

        <div className="flex flex-col gap-6 items-center justify-center">

          <AnimationLayout>

            <QuestionPool />

          </AnimationLayout>


          <AnimationLayout>

            <BadgeCard />

          </AnimationLayout>






          <Ranking players={player} loading={loading} />





        </div>




      </div>

    </MainLayout>



  )
}

export default Home