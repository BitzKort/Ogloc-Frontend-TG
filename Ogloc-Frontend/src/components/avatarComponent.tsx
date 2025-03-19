import React, { useState } from "react";

interface AvatarCard {

    avatarImage: string
    avatarName: string
    exp: number
    state: string

}


interface AvatarProps {

    avatarInfo: AvatarCard
    onSelect: () => void


}



const Avatar: React.FC<AvatarProps> = ({avatarInfo, onSelect}) => {

    return (

        <div onClick={onSelect} className="flex flex-col shadow-md hover:shadow-white p-3 m-5 items-center rounded-xl justify-center"> 

            <img className="flex  w-20 h-30 object-contain" src = {avatarInfo.avatarImage}/>

            <div className="flex flex-col items-center gap-3">

                <span>@{avatarInfo.avatarName}</span>

                <div className="flex flex-row justify-between ">
                    <span>{avatarInfo.state}</span>
                    
                    <span className="flex ml-10 ">{avatarInfo.exp} exp</span>
        
                 </div>


            </div>
            

        </div>
    )

}

export default Avatar;