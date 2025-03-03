import React from "react";
import MainLayout from "../layout/mainLayout";

import LessonCard from "../components/lessonCard";

import QuestionPool from "../components/QuestionPool";

import AvatarStoreCard from "../components/avatarStoreCard";

interface HomeProps {

    showNavBar: boolean;

}

const Home: React.FC<HomeProps> = ({showNavBar})=>{


    return (


        <MainLayout navBar = {showNavBar} >

            <div className="flex flex-col min-w-screen min-h-full">
               
               <h1 className="ml-10 text-2xl whitespace-normal"> Modulos <br /> &emsp;  de preguntas</h1>

               <div className="flex flex-row gap-5 overflow-x-auto custom-scroll my-5">

                {/* here is just and example for the lesson's scroll side*/}
                <LessonCard title="something" QCount="1/5"/>
                <LessonCard title="something" QCount="1/5"/>
                <LessonCard title="something" QCount="1/5"/>
                <LessonCard title="something" QCount="1/5"/>
                <LessonCard title="something" QCount="1/5"/>
                <LessonCard title="something" QCount="1/5"/>
                <LessonCard title="something" QCount="1/5"/>
                <LessonCard title="something" QCount="1/5"/>
                <LessonCard title="something" QCount="1/5"/>
                <LessonCard title="something" QCount="1/5"/>
               </div>

            <QuestionPool/>
            <AvatarStoreCard/>

            </div>

        </MainLayout>


        
    )
}

export default Home