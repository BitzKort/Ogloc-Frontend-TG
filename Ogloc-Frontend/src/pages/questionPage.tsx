import React from "react";
import MainLayout from "../layout/mainLayout";



interface QuestionPageProps {

    showNavBar: boolean
}

const QuestionPage: React.FC<QuestionPageProps> =({showNavBar}) => {

    return (

        <MainLayout navBar = {showNavBar}>


            <div className="flex flex-col items-center justify-center"> esta es la pagina de las preguntas

            </div>



        </MainLayout>

        


    )
}


export default QuestionPage;