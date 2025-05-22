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

const Ranking: React.FC<RankingProps> = ({players, loading}) => {


    
    return (
  <div
      className="w-full max-w-lg bg-gradient-to-br from-teal-600 to-[#61DECA]/60 rounded-lg mx-auto p-2"
    >
      <div
        className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="px-6 py-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            Player Rankings
          </h1>
          <p className="text-sm sm:text-base text-white">
            Top Players Leaderboard
          </p>
        </div>

        <SkeletonTheme baseColor="#0d9488" highlightColor="#61DECA">
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="bg-cyan-950/50">
                  <th className="px-4 py-3 text-left text-sm ">
                    Rank
                  </th>
                  <th className="px-4 py-3 text-left text-sm ">
                    Username
                  </th>
                  <th className="px-4 py-3 text-right text-sm ">
                    EXP
                  </th>
                  <th className="px-4 py-3 text-right text-sm">
                    Days Active
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