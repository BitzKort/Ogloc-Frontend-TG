import React from "react";

import { motion } from "framer-motion";


interface AnimationLayoutProps {

    children: React.ReactNode
}

/**
 * Layout para englobar componentes  que tengan una animacion por defecto utilizando framer motion.
 * @param AnimationLayoutProps - objeto tipo reactNode para que se muestre el componente animado.
*/
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