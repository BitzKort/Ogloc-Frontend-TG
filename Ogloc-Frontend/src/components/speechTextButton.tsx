import React, { useEffect, useRef, useState } from "react";

import { Mic } from "lucide-react";

interface SpeechTextProps {

    setText: (valor: string) => void;
}



const SpeechTextButton: React.FC<SpeechTextProps> = ({ setText }) => {


    function speechToText() {

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.onresult = async function (event) {
            const transcript = event.results[0][0].transcript;
            setText(transcript);
        }

        recognition.start()

    }

    return (

        <button
            onClick={speechToText}

            className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-full hover:text-[#61DECA]/60 shadow-sm hover:shadow-gray-600"
        >
            <Mic className="h-8 w-8" />
        </button>

    )


}


export default SpeechTextButton;