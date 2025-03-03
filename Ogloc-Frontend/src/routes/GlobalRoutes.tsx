import { Routes, Route } from "react-router-dom";

import Auth from "../pages/Auth";
import Home from "../pages/home";

const GlobalRoutes = () => {

    return (
           
          <Routes>
    
            <Route path="/Auth" element={<Auth showNavBar = {false} />}/>
            <Route path="/" element={<Home showNavBar = {true}/>}/>
    
          </Routes>

    )
    
}

export default GlobalRoutes