import React, { useState } from "react"

import RankingUser from "./rankingUser"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

interface Player {

    username: string,
    exp: number,
    dias: number
}


interface RankingProps {

   players: Player[]
   loading: boolean

}

const Ranking: React.FC<RankingProps> = ({players, loading}) => {


  




    
    return (

        <div className="w-300 bg-gradient-to-br from-teal-600 to-[#61DECA]/60 rounded-lg sm:w-150 md:w-200">
          <div className=" flex flex-col bg-white/10 min-w-full backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 text-center">
              <h1 className="text-3xl font-bold text-white mb-2">Player Rankings</h1>
              <p className="text-white">Top Players Leaderboard</p>
            </div>
            <SkeletonTheme baseColor="#0d9488" highlightColor="#61DECA">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-cyan-950/50 text-purple-100">
                    <th className="px-6 py-4 text-left">Rank</th>
                    <th className="px-6 py-4 text-left">Username</th>
                    <th className="px-6 py-4 text-right">EXP</th>
                    <th className="px-6 py-4 text-right">Days Active</th>
                  </tr>
                </thead>
                <tbody>

                  {loading ? (

          

                      <Skeleton className="!absolute !h-3" count={3}/>

     
                    
                  ) : (

                    players.map((player, index) => (
                      <RankingUser key = {index} index={index} player={player}/>
                    ))


                  )
                }

                  
                </tbody>
              </table>
            </div>
            </SkeletonTheme>
          </div>
        </div>
    );

}

export default Ranking;