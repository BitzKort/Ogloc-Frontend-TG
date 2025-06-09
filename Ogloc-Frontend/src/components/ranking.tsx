import React, { useState } from "react"

import RankingUser from "./rankingUser"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

interface Player {

    username: string,
    exp: number,
    days: number
}


interface RankingProps {

   players: Player[]
   loading: boolean

}


/**
 * Componente de ranking, este es el componente que engloba todos los usuarios que se
 * muestran como lista en la pagina principal.
 */
const Ranking: React.FC<RankingProps> = ({players, loading}) => {


    
    return (
  <div
    className="bg-gradient-to-br from-teal-600 to-[#61DECA]/60 rounded-lg mx-auto p-2 w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:max-w-screen-lg"
    
     >
    
      <div
        className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="px-6 py-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            Clasificación de jugadores.
          </h1>
          <p className="text-sm sm:text-base text-white">
            Top 10 Jugadores.
          </p>
        </div>

        <SkeletonTheme baseColor="#0d9488" highlightColor="#61DECA">
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="bg-cyan-950/50">
                  <th className="px-4 py-3 text-left text-sm ">
                    N°
                  </th>
                  <th className="px-4 py-3 text-left text-sm ">
                    Username
                  </th>
                  <th className="px-4 py-3 text-right text-sm ">
                    EXP
                  </th>
                  <th className="px-4 py-3 text-right text-sm">
                    Días racha.
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  // Mismo número de filas esqueléticas que la data real
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="h-10">
                      <td colSpan={4}>
                        <Skeleton height={16} />
                      </td>
                    </tr>
                  ))
                ) : (
                  players.map((player, idx) => (
                    <RankingUser key={idx} index={idx} player={player} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </SkeletonTheme>
      </div>
    </div>
    );

}

export default Ranking;