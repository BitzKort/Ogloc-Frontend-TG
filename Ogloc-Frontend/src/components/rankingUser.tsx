import React from "react"


interface Player {
    
    username: string,
    exp: number,
    days: number
}


interface RankingUserProps {

    index: number,
    player: Player
}
 

/**
 * Componente de ranking para la carga individual de cada usuario que esta en el ranking.
 */
const RankingUser: React.FC<RankingUserProps> = ({index, player}) => {


     return (
    <tr>
      <td className="px-4 sm:px-6 py-2 text-sm sm:text-base">
        <div className="flex items-center text-white">
          {index + 1}
        </div>
      </td>
      <td className="px-4 sm:px-6 py-2 text-sm sm:text-base">
        <span className="text-white font-semibold">
          {player.username}
        </span>
      </td>
      <td className="px-4 sm:px-6 py-2 text-right">
        <span className="text-yellow-400 font-bold font-mono text-sm sm:text-base">
          {player.exp.toLocaleString()}
        </span>
      </td>
      <td className="px-4 sm:px-6 py-2 text-right">
        <span className="text-purple-200 text-sm sm:text-base">
          {player.days} días
        </span>
      </td>
    </tr>
  );

}

export default RankingUser;