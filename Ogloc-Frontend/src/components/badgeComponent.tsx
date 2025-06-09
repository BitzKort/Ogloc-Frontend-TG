import React, { useState } from "react";


interface BadgeCard {

    badgeImage: string
    badgeName: string
    exp: number
    state: string

}

interface BadgeProps {

    badgeInfo: BadgeCard
    onSelect: () => void


}


/**
 * Componente de insignia
 * @param BadgeProps - Recibe objeto tipo badgeCard y funcion onSelect.
 */
const Badge: React.FC<BadgeProps> = ({badgeInfo, onSelect}) => {

    return (

        <div onClick={onSelect} className="flex flex-col shadow-md hover:shadow-white p-3 m-5 items-center rounded-xl justify-center"> 

            <img className="flex  w-20 h-30 object-contain" src = {badgeInfo.badgeImage}/>

            <div className="flex flex-col items-center gap-3">

                <span>@{badgeInfo.badgeName}</span>

                <div className="flex flex-row justify-between ">
                    <span>{badgeInfo.state}</span>
                    
                    <span className="flex ml-10 ">{badgeInfo.exp} exp</span>
        
                 </div>


            </div>
            

        </div>
    )

}

export default Badge;