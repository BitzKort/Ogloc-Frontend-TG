import React from "react"


interface Player {
    
    username: string,
    exp: number,
    dias: number
}


interface RankingUserProps {

    index: number,
    player: Player
}
 


const RankingUser: React.FC<RankingUserProps> = ({index, player}) => {


    return (

        <tr 
        key={index}
      >
        <td className="px-6 py-4">
          <div className="flex items-center text-white gap-2">
              {index}
           
          </div>
        </td>
        <td className="px-6 py-4">
          <span className="text-white font-semibold">{player.username}</span>
        </td>
        <td className="px-6 py-4 text-right items-center justify-center">
          <span className="text-yellow-400 font-bold font-mono font-bold">
            {player.exp.toLocaleString()}
          </span>
        </td>
        <td className="px-6 py-4 text-right">
          <span className="text-purple-200">
            {player.dias} days
          </span>
        </td>
      </tr>


    )

}

export default RankingUser;