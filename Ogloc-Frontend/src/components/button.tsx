import React from "react";


interface ButtonProps {

    color: string,
    text: string



}

const Button: React.FC<ButtonProps> = ({color, text}) =>{

    return (

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> {text}</button>



    )
}


export default Button