import React from "react";
import Footer from "../components/footer";
import fondo from '../assets/background login.webp'
import NavBar from "../components/navBar";


interface MainLayoutProps {

    children: React.ReactNode;
    navBar: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({children, navBar}) => {

    return (

        <div className="flex flex-col min-h-screen bg-cover bg-center " style={{ backgroundImage: `url(${fondo})` }}>
        
        {navBar && <NavBar/>}

        <main className="flex-grow flex justify-center items-center m-2 sm:m-4 md:m-8 lg:m-12 xl:m-16">

            {children}

        </main>
  

        <Footer>

        </Footer>

        </div>
    )

}

export default MainLayout