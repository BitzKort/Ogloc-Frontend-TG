import Ogloc from "../assets/Ogloc logo 2.png"
import GandalfVerde from "../assets/rana-Ogloc.svg"
import Gustavf from "../assets/zorro ogloc.png"
import { motion } from "framer-motion"; 
import { useNavigate } from "react-router-dom";

const AvatarStoreCard: React.FC = () => {

    const images = [

        Ogloc,
        GandalfVerde,
        Gustavf
    ]

    const navigate = useNavigate();

    return (

        <div className="flex flex-col gap-2 bg-[#61DECA]/60 items-center justify-center  min-w-full py-8 sm:px-2 md:px-10 lg:px-80 rounded-lg" onClick={() => {navigate("/store")}}>

            <div className="flex flex-row gap-5  justify-center items-center">


            {images.map((src, index) => (
                <motion.img
                key={index}
                src={src}
                alt={`img-${index}`}
                className="w-32 h-32 object-contain rounded-4xl shadow-sm shadow-gray-600"
                animate={{ rotateY: [0, 360] }} // Gira en bucle
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.8 }}
                />
            ))}

                
            </div>

            <h1 className="ml-10 text-2xl"> Consigue puntos de experiencia para cambiar a tu avatar</h1>

        </div>

        

    )
}


export default AvatarStoreCard;