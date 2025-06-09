import { Routes, Route } from "react-router-dom";

import Auth from "../pages/Auth";
import Home from "../pages/home";
import UserProfile from "../pages/userProfile";
import BadgePage from "../pages/Badges";
import QuestionPage from "../pages/questionPage";
import IncorrectQuestionPage from "../pages/incorrectQuestionPage";
import ForgotPassword from "../pages/resetPassword";
import ChangePasword from "../pages/changePassword";

const GlobalRoutes = () => {


    return (

          <Routes>
            <Route path="/Auth" element={<Auth showNavBar = {false} />}/>
            <Route path="/" element={<Home showNavBar = {true}/>}/>
            <Route path="profile" element  = {<UserProfile showNavBar = {true} />}/>
            <Route path ="badges" element = {<BadgePage showNavBar = {true} />} />
            <Route path = "question/:lessonId" element = {<QuestionPage showNavBar = {false}/>}/>
            <Route path="resetPassword" element  = {<ForgotPassword showNavBar = {false} />}/>
            <Route path="changePassword/" element  = {<ChangePasword showNavBar = {false} />}/>
            <Route path="incorrectQuestion" element  = {<IncorrectQuestionPage showNavBar = {false} />}/>
          </Routes>

    )
    
}

export default GlobalRoutes