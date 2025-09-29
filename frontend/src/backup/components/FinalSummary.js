import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function FinalSummary({ playerName, score, onRestart }) {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    // Envia resultado do jogador ao backend
    if (playerName) {
      fetch("http://localhost:5000/ranking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: playerName, score }),
      });
    }

    // Recebe ranking atualizado em tempo real
    socket.on("rankingUpdate", (updated) => {
      setRanking(updated);
    });

    return () => {
      socket.off("rankingUpdate");
    };
  }, [playerName, score]);

  return (
    <div className="summary-container">
      <h2 className="summary-title">Resumo Final</h2>
      <p className="summary-player">
        Jogador: <strong>{playerName}</strong>
      </p>
      <p className="summary-score">
        Sua pontuação final: <strong>{score} pontos</strong>
      </p>

      <h3 className="ranking-title">🏆 Ranking Atual</h3>
      <div className="leaderboard">
        {ranking.map((r, idx) => (
          <div key={idx} className="leaderboard-item">
            <span className="rank">{idx + 1}º</span>
            <span className="player">{r.name}</span>
            <span className="score">{r.score} pts</span>
          </div>
        ))}
      </div>

      <button onClick={onRestart} className="next-btn">
        Jogar Novamente
      </button>
    </div>
  );
}

export default FinalSummary;








