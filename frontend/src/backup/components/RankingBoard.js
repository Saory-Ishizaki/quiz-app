// src/components/RankingBoard.js
import React, { useEffect, useState } from "react";
import { socket } from "../api";

export default function RankingBoard() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    socket.on("rankingUpdate", (data) => {
      setRanking(data);
    });

    return () => socket.off("rankingUpdate");
  }, []);

  return (
    <div className="ranking-board">
      <h2>🏆 Ranking</h2>
      <table>
        <thead>
          <tr>
            <th>Posição</th>
            <th>Jogador</th>
            <th>Pontuação</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((r, i) => (
            <tr key={i}>
              <td>{i + 1}º</td>
              <td>{r.name}</td>
              <td>{r.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
