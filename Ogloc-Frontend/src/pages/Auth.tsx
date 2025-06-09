import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "../layout/mainLayout";
import Login from "./login";
import Register from "./register";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface AuthProps {

    showNavBar: boolean;
}



const Auth: React.FC<AuthProps> = ({ showNavBar }) => {

    const [isFlipped, setIsFlipped] = useState(false);

    const [valuesLogin, setValuesLogin] = useState({ email: "", password: "" });

    const [valuesRegister, setValuesRegister] = useState({ name: "", username: "", email: "", password: "" });

    const navigate = useNavigate();


    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem("auth");

            if (!token) return;

            try {
                await axios.get("http://localhost:8000/verifyToken", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                navigate("/");
            } catch (error) {
                console.error(error)
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    localStorage.removeItem("auth");
                    alert("Inicia sesión nuevamente");
                    navigate("/auth");
                }
            }
        };

        verifyToken();
    }, [navigate]);


    const toggleForm = () => {

        setIsFlipped(!isFlipped);

    }

    useEffect(() => {

        setValuesLogin({ email: "", password: "" })
    }, [isFlipped]);


    useEffect(() => {

        setValuesRegister({ name: "", username: "", email: "", password: "" })
    }, [isFlipped]);

    return (

        <MainLayout navBar={showNavBar}>

            <div>
                <AnimatePresence mode="wait">
                    {!isFlipped ? (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, rotateY: 0 }}
                            transition={{ duration: 0.8 }}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <Login
                                toggleForm={toggleForm}
                                valuesLogin={valuesLogin}
                                setValuesLogin={setValuesLogin}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="register"
                            initial={{ rotateY: 180, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            exit={{ rotateY: 180, opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <Register
                                toggleForm={toggleForm}
                                valuesRegister={valuesRegister}
                                setValuesRegister={setValuesRegister}
                            />
                        </motion.div>
                    )}
                    -       </AnimatePresence>
            </div>

        </MainLayout>


    )



}

export default Auth