import React from "react";
import Footer from "../components/footer";
import NavBar from "../components/navBar";


interface MainLayoutProps {

    children: React.ReactNode;
    navBar: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({children, navBar}) => {

    return (

        <div className="flex flex-col min-h-screen bg-[linear-gradient(to_bottom,#aed8dc,#5ba6b8,#2e788f,#1f2a36)]" >
        
        {navBar && <NavBar/>}

        <main className=" flex flex-grow justify-center m-2 sm:m-3">

            {children}

        </main>
  

        <Footer>

        </Footer>

        </div>
    )

}

export default MainLayout