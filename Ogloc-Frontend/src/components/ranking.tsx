import React from "react"

import RankingUser from "./rankingUser"

interface Player {

    username: string,
    exp: number,
    dias: number
}


interface RankingProps {

   players: Player[]

}

const Ranking: React.FC<RankingProps> = ({players}) => {

    
    return (

        <div className=" bg-gradient-to-br from-teal-600 to-[#61DECA]/60 rounded-lg w-200">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 text-center">
              <h1 className="text-3xl font-bold text-white mb-2">Player Rankings</h1>
              <p className="text-white">Top Players Leaderboard</p>
            </div>
            
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
                  {players.map((player, index) => (
                    <RankingUser key = {index} index={index} player={player}/>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    );

}

export default Ranking;