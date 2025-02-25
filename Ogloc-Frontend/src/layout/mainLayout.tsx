import React from "react";
import Footer from "../components/footer";
import fondo from '../assets/background login.webp'


interface MainLayoutProps {

    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {


    return (

        <div className="flex flex-col min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${fondo})` }}>

        <main className="flex-grow flex justify-center items-center">

            {children}

        </main>
  

        <Footer>

        </Footer>

        </div>
    )

}

export default MainLayout