import { Routes, Route } from "react-router-dom";

import Prueba from "../pages/prueba";
const GlobalRoutes = () => {

    return (
           
          <Routes>
    
            <Route path="/" element={<Prueba/>}/>
    
          </Routes>

    )
    
}

export default GlobalRoutes