import React from "react";
import Footer from "../components/footer";
import fondo from '../assets/background login.webp'
import NavBar from "../components/navBar";


interface MainLayoutProps {

    children: React.ReactNode;
    navBar: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({children, navBar}) => {

    //style={{ backgroundImage: `url(${fondo})` }}

    return (

        <div className="flex flex-col min-h-screen bg-cover bg-center bg-[#2E2E2E]">
        
        {navBar && <NavBar/>}

        <main className="flex-grow flex justify-center m-2 sm:m-3 md:m-7 lg:m-11 xl:m-15">

            {children}

        </main>
  

        <Footer>

        </Footer>

        </div>
    )

}

export default MainLayout