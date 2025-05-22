import React, { useEffect, useState } from "react";
import MainLayout from "../layout/mainLayout";

import Pinguin from "../assets/pinguino Ogloc fixed.png";

import { DoorOpen, Mic, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface QuestionPageProps {

    showNavBar: boolean
}

interface Question {
  id: string;
  title: string;
  text: string;
  question_id: string;
  question_text: string;
  answer: string;
  distractor: string;
}

interface QuestionsResponse {
  questions: Question[];
}

interface compare {

    sentenceNlp: string
    sentenceUser: string
    score: string
}

const QuestionPage: React.FC<QuestionPageProps> = ({ showNavBar }) => {

    const [lesson, setLessons] = useState<Question[]>([]);
    const [question, setQuestion] = useState<Question | null>(null);
    const [text, setText] = useState<string>(" ");
    const [correct, setCorrect] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { lessonId } = useParams<{ lessonId: string }>();


useEffect(() => {
  const fetchLesson = async () => {
    const token = localStorage.getItem('auth');
    if (!token) {
      console.log('No se encontró token de autenticación');
      navigate("/auth");
      return;
    }

    try {
      const response = await axios.get<QuestionsResponse>(
    'http://localhost:8000/lessons',
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: { lessonId },
    });

      if (response.status === 401) {
        navigate("/auth");
        return;
      }

      setLessons(response.data.questions);
      if (response.data.questions.length > 0) {
        setQuestion(response.data.questions[0]);
      }
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        navigate("/auth");
      } else {
        console.error("Error al obtener la lección:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchLesson();
}, []);


    function speechToText() {

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = "en-US"

        recognition.onresult = async function (event) {
            const transcript = event.results[0][0].transcript;
            setText(transcript);
        }
        recognition.start()

    }


    async function sendToCompare(answer: string, answerUser: string) {

        console.log(typeof (answer))
        console.log(typeof (answerUser))

        try {

            const compareRes = await axios.post<compare>("http://localhost:8000/compareResponses",
                {
                    params: {
                        sentenceNlp: answer,
                    }
                })

            console.log(compareRes.data)

        } catch (error) {

            console.log(error)
        }



    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };


    return (

        <MainLayout navBar={showNavBar}>


            <div className="flex-col min-w-full ">

                <SkeletonTheme baseColor="#202020" highlightColor="#444">

                    <div className=" flex flex-col justify-center items-center ">
                        <span className=" text-xl font-semibold text-white left-1/2">

                            {loading ? (

                                <Skeleton className="!w-40" />

                            ) : (

                                question?.title
                            )}

                        </span>
                        <span className=" text-xl font-semibold text-white left-1/2">

                            {loading ? (

                                <Skeleton className="!w-20" />

                            ) : (

                                "1/2"
                            )}

                        </span>

                    </div>

                    <div className="flex flex-row min-w-full items-center justify-around py-4 px-15">

                        <div className="self-start max-w-xl    text-white  bg-[#444444] rounded-xl p-5">

                            {loading ? (

                                <Skeleton className="!w-80 !h-3 !rounded-xl" count={10} />
                            ) : (

                                question?.text


                            )}

                        </div>


                        <div className="max-w-md flex self-start flex-col p-5 gap-6 rounded-xl bg-[#444444]">

                            <SkeletonTheme baseColor="#0d9488" highlightColor="#61DECA">
                                <p className="text-white">

                                    {loading ? (

                                        <Skeleton className="!w-65 !h-4" count={3} />
                                    ) : (

                                        question?.question_text

                                        
                                    )}

                                </p>

                                <input className="p-5 m-5 border bg-white/70 rounded-xl" placeholder="espacio para la respuesta" onChange={handleChange} value={text}></input>


                                <div className="flex flex-row justify-between">


                                    <button
                                        onClick={() => sendToCompare(text, text)}
                                        className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-[#61DECA]/60  shadow-sm hover:shadow-gray-600"
                                    >
                                        <Send className="h-4 w-4" />
                                        <span>Enviar</span>
                                    </button>

                                    <button
                                        onClick={speechToText}

                                        className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-full hover:text-[#61DECA]/60 shadow-sm hover:shadow-gray-600"
                                    >
                                        <Mic className="h-8 w-8" />
                                    </button>


                                </div>



                            </SkeletonTheme>
                        </div>

                    </div>

                    <div className=" relative flex items-center p-5 m-10 ">
                        <img src={Pinguin} className="absolute left-1/3 w-30 object-contain " />


                    </div>

                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-[#FF0000]/60  shadow-sm hover:shadow-gray-600"
                    >
                        <DoorOpen className="h-4 w-4" />
                        <span>Salir de la leccion</span>
                    </button>


                </SkeletonTheme>
            </div>



        </MainLayout>




    )
}


export default QuestionPage;