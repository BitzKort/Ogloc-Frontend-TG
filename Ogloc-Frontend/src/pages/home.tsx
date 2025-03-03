import React from "react";
import MainLayout from "../layout/mainLayout";


interface HomeProps {

    showNavBar: boolean;

}

const Home: React.FC<HomeProps> = ({showNavBar})=>{


    return (


        <MainLayout navBar = {showNavBar} >

            <div className="flex items-center justify-center">
               <h1>Estas en Home</h1>
            </div>

        </MainLayout>


        
    )
}

export default Home