import { useState } from "react";
import {motion} from "framer-motion";
import MainLayout from "../layout/mainLayout";
import Login from "./login";
import Register from "./register";


const Auth = () => {

    const [isFlipped, setIsFlipped] = useState(false);

    const toggleForm = () => {
        setIsFlipped(!isFlipped);

    }


    return (

        <MainLayout>

            <div >
                        <motion.div
                           
                            initial={false}
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ duration: 0.4 }}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div className={` backface-hidden ${isFlipped ? "hidden" : ""}`}>
                                <Login toggleForm={toggleForm} />
                            </div>

    
                            <div className={` backface-hidden ${isFlipped ? "" : "hidden"} rotate-y-180`}>
                                <Register toggleForm={toggleForm} />
                            </div>
                        </motion.div>
            </div>

        </MainLayout>

        
    )



}

export default Auth