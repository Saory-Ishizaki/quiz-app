// src/components/RankingBoard.js
import React, { useEffect, useState } from "react";
import { socket, fetchRanking } from "../api";

export default function RankingBoard() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetchRanking().then(r => { if (mounted) setRanking(r); }).catch(()=>{});
    socket.on("rankingUpdate", (data) => setRanking(data));
    return () => { mounted = false; socket.off("rankingUpdate"); };
  }, []);

  return (
    <div className="ranking-board">
      <h2>🏆 Ranking</h2>
      <div className="leaderboard">
        {ranking.map((r, i) => (
          <div key={i} className="leaderboard-item">
            <span className="rank">{i+1}º</span>
            <span className="player">{r.name}</span>
            <span className="score">{r.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}


