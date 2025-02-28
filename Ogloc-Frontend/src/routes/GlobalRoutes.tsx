import { Routes, Route } from "react-router-dom";

import Auth from "../pages/Auth";
const GlobalRoutes = () => {

    return (
           
          <Routes>
    
            <Route path="/" element={<Auth/>}/>
    
          </Routes>

    )
    
}

export default GlobalRoutes