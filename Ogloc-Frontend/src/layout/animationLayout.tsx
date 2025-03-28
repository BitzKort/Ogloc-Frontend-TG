import React from "react";

import { motion } from "framer-motion";


interface AnimationLayoutProps {

    children: React.ReactNode
}


const AnimationLayout: React.FC<AnimationLayoutProps> = ({children}) => {

    return (


        <motion.div 
        animate ={{y: [-5, 5]}}
        whileHover={{
            y: [-5, 5],  // Movimiento flotante
            transition: { repeat: Infinity, repeatType: "reverse", duration: 1.5, ease: "easeInOut" },
            scale: 1.05,   // Efecto de escala al pasar el mouse
            }}
        
        
    >


        {children}


    </motion.div>



    )
}

export default AnimationLayout;