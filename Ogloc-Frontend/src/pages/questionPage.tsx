import React, { useEffect, useState } from "react";
import MainLayout from "../layout/mainLayout";
import { DoorOpen, Mic, Send } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface QuestionPageProps {
    showNavBar: boolean;
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

interface Compare {
    status: string;
    userId: string;
    score: string;
    msg: string;

}

const QuestionPage: React.FC<QuestionPageProps> = ({ showNavBar }) => {
    const [lesson, setLessons] = useState<Question[]>([]);
    const [question, setQuestion] = useState<Question | null>(null);
    const [text, setText] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [isSent, setIsSent] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
    const { lessonId } = useParams<{ lessonId: string }>();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [compareMsg, setCompareMsg] = useState<string>("");
    const [compareStatus, setCompareStatus] = useState<string>("");

    useEffect(() => {
        const fetchLesson = async () => {
            const token = localStorage.getItem("auth");
            if (!token) {
                navigate("/auth");
                return;
            }
            try {
                const { data, status } = await axios.get<QuestionsResponse>(
                    "http://localhost:8000/lessons",
                    { headers: { Authorization: `Bearer ${token}` }, params: { lessonId } }
                );
                if (status === 401) {
                    navigate("/auth");
                    return;
                }
                setLessons(data.questions);
                setCurrentQuestionIndex(0);
                setQuestion(data.questions[0] || null);

            } catch (err: any) {
                setModalMessage(err.response.data.detail);
                setShowModal(true);
            } finally {
                setLoading(false);
            }
        };
        fetchLesson();
    }, [lessonId, navigate]);


    const handleNextQuestion = () => {
        if (lesson && currentQuestionIndex < lesson.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setQuestion(lesson[currentQuestionIndex + 1]);
            setIsSent(false);
            setText("");
            setCompareMsg("");
            setCompareStatus("");
        }
    };

    const speechToText = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.onresult = (e) => setText(e.results[0][0].transcript);
        recognition.start();
    };

    const sendToCompare = async (answer: string, answerUser: string, question_id: string) => {
        setError("");
        try {

            const token = localStorage.getItem('auth');
            if (!token) return navigate('/auth');
            const { data } = await axios.post<Compare>(
                "http://localhost:8000/compareResponses",
                {
                    "lesson_id": lessonId,
                    "question_id": question_id,
                    "newExp": 50,
                    "sentenceNlp": answer,
                    "sentenceUser": answerUser,
                    "type": 1
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }


            );
            setCompareMsg(data.msg);
            setCompareStatus(data.status);
            setIsSent(true);
        } catch (err: any) {
            setError(err.response?.data?.message || "Error al comparar respuestas");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    return (
        <MainLayout navBar={showNavBar}>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white/50 rounded-2xl shadow-xl p-10 max-w-sm">
                        <h2 className="text-lg mb-4">Aviso</h2>
                        <p className="mb-6">{modalMessage}</p>
                        <button
                            onClick={() => {
                                setShowModal(false);
                                navigate("/");
                            }}
                            className="px-4 py-2 rounded-lg hover:bg-blue-700 bg-[#61DECA] text-white hover:bg-teal-500"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}


            {!showModal && (
                <div className=" flex flex-col justify-between items-centerp-4 sm:p-8">
                    <div className=" justify-between w-full max-w-4xl">
                        <SkeletonTheme baseColor="#444544" highlightColor="#444">

                            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-white">
                                    {loading ? <Skeleton width={200} /> : question?.title}
                                </h1>
                                <span className="text-white text-sm sm:text-base">
                                    {loading ? (
                                        <Skeleton width={50} />
                                    ) : (
                                        `${currentQuestionIndex + 1}/${lesson.length}`
                                    )}
                                </span>
                            </div>


                            <div className=" gap-2 justify-between flex flex-col md:flex-row">

                                <div className="md:w-1/2 bg-[#444544]/50 rounded-xl p-6 text-white">
                                    {loading ? <Skeleton count={5} /> : question?.text}
                                </div>


                                <div className=" bg-[#444544]/50 rounded-xl p-10">
                                    <p className="text-white mb-4">
                                        {loading ? <Skeleton count={3} /> : question?.question_text}



                                    </p>

                                    {!loading && question && (
                                        <>
                                            <ul className="list-decimal list-inside space-y-2 mb-2">
                                                <li className="text-green-300">{question.answer}</li>
                                                <li className="text-yellow-300">{question.distractor}</li>
                                            </ul>

                                            {compareMsg && (
                                                <p className={`mb-4 ${compareStatus === "success" ? "text-green-400" : "text-red-400"
                                                    }`}>
                                                    {compareMsg}
                                                </p>
                                            )}
                                        </>
                                    )}
                                    <input
                                        type="text"
                                        className="w-full p-3 mb-4 text-sm rounded border border-white/30"
                                        placeholder="Dale al microfono para escuchar tu respuesta..."
                                        onChange={handleChange}
                                        value={text}
                                        readOnly
                                    />
                                    {error && <p className="text-red-400 mb-4">{error}</p>}
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
                                        <button
                                            onClick={() => sendToCompare(question!.answer, text, question!.id)}
                                            disabled={!text || isSent}
                                            className={`flex-1 px-4 py-2 rounded-lg
                                                    ${!text || isSent
                                                    ? "bg-gray-500 cursor-not-allowed"
                                                    : "bg-[#61DECA] hover:bg-teal-500"} 
                                                    text-white`}
                                        >
                                            <Send className="inline-block mr-2" />Enviar
                                        </button>
                                        <button
                                            onClick={speechToText}
                                            className="flex items-center justify-center px-4 py-2 bg-white/20 text-white rounded-full hover:text-[#00FFFF50] hover:bg-white/30"
                                        >
                                            <Mic className="h-6 w-6" />
                                        </button>

                                    </div>
                                    {lesson && currentQuestionIndex < lesson.length - 1 && (
                                        <button
                                            onClick={handleNextQuestion}
                                            disabled={!isSent}
                                            className={`mt-4 px-4 py-2 rounded-lg transition-colors ${!isSent
                                                ? "bg-gray-500 cursor-not-allowed"
                                                : "bg-[#61DECA] hover:bg-teal-500"
                                                } text-white`}
                                        >
                                            Siguiente
                                        </button>
                                    )}


                                </div>
                            </div>
                            {/* Exit Button */}
                            <button
                                onClick={() => navigate("/")}
                                className="mt-8 w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                <DoorOpen className="inline-block mr-2" />Salir de la lección
                            </button>
                        </SkeletonTheme>
                    </div>
                </div>

            )}
        </MainLayout>
    );
};

export default QuestionPage;
