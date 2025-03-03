import { useState, useEffect } from "react";
import {motion} from "framer-motion";
import MainLayout from "../layout/mainLayout";
import Login from "./login";
import Register from "./register";

interface AuthProps {

    showNavBar: boolean;
}


const Auth: React.FC<AuthProps> = ({showNavBar}) => {

    const [isFlipped, setIsFlipped] = useState(false);

    const [valuesLogin, setValuesLogin] = useState({ email: "", password: "" });

    const [valuesRegister, setValuesRegister] = useState({name: "", username: "", email: "", password: ""});

    const toggleForm = () => {
        setIsFlipped(!isFlipped);

    }

    useEffect (() => {

        setValuesLogin({email:"", password:""})
    }, [isFlipped]);


    useEffect (() => {

        setValuesRegister({name: "", username: "", email: "", password: ""})
    }, [isFlipped]);

    return (

        <MainLayout navBar = {showNavBar}>

            <div >
                        <motion.div
                           
                            initial={false}
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ duration: 0.4 }}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div className={` backface-hidden ${isFlipped ? "hidden" : ""}`}>
                                <Login toggleForm={toggleForm} valuesLogin = {valuesLogin} setValuesLogin = {setValuesLogin} />
                            </div>

    
                            <div className={` backface-hidden ${isFlipped ? "" : "hidden"} rotate-y-180`}>
                                <Register toggleForm={toggleForm} valuesRegister = {valuesRegister} setValuesRegister = {setValuesRegister} />
                            </div>
                        </motion.div>
            </div>

        </MainLayout>

        
    )



}

export default Auth