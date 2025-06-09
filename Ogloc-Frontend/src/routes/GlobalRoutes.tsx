import { Routes, Route } from "react-router-dom";

import Auth from "../pages/Auth";
import Home from "../pages/home";
import UserProfile from "../pages/userProfile";
import StorePage from "../pages/store";
import QuestionPage from "../pages/questionPage";

const GlobalRoutes = () => {


    return (
           
          <Routes>
    
            <Route path="/Auth" element={<Auth showNavBar = {false} />}/>
            <Route path="/" element={<Home showNavBar = {true}/>}/>
            <Route path="profile" element  = {<UserProfile showNavBar = {true} />}/>
            <Route path ="store" element = {<StorePage showNavBar = {true} />} />
            <Route path = "question/:id" element = {<QuestionPage showNavBar = {false}/>}/>
    
          </Routes>

    )
    
}

export default GlobalRoutes