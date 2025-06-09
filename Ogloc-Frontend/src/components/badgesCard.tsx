import Ogloc from "../assets/Ogloc logo 2.png"
import magicMan from "../assets/rana-Ogloc.svg"
import Elegant from "../assets/zorro ogloc.png"
import { motion } from "framer-motion"; 
import { useNavigate } from "react-router-dom";



/**
 * Componente de bloque de la insignia, este componente se encarga de redireccionar desde home a la vista de insignias.
 */
const BadgeCard: React.FC = () => {

    const images = [

        Ogloc,
        magicMan,
        Elegant
    ]

    const navigate = useNavigate();

    return (

        <div onClick={() => navigate('/badges')}
            className={` flex flex-col items-center justify-center bg-[#61DECA]/60 w-full py-8 px-4 sm:px-8 md:px-16 lg:px-45 rounded-lg cursor-pointer
                            transition-transform duration-200
                            hover:scale-[1.02]`}
            >

            <div className="flex flex-row gap-5  justify-center items-center">


            {images.map((src, index) => (
                <motion.img
                key={index}
                src={src}
                alt={`img-${index}`}
                className="w-18 h-32 object-contain rounded-4xl shadow-sm shadow-gray-600"
                 animate={{ rotateY: [0, 360] }} // Gira en bucle
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.8 }}
                />
            ))}

                
            </div>

            <h1 className="text-xl sm:text-xl md:text-2xl text-center leading-snug"> Consigue puntos de experiencia para obtener tu insignia.</h1>

        </div>

        

    )
}


export default BadgeCard;