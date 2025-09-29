// src/components/FinalSummary.js
import React, { useEffect, useState } from "react";
import { socket, fetchRanking } from "../api";

export default function FinalSummary({ playerName, breakdown, totalScore, onRestart }) {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    let mounted = true;
    // fetch initial ranking
    fetchRanking().then((r) => { if (mounted) setRanking(r); }).catch(()=>{});
    // subscribe socket updates
    socket.on("rankingUpdate", (updated) => setRanking(updated));
    return () => { mounted = false; socket.off("rankingUpdate"); };
  }, []);

  // calculate player's position if present
  const myIndex = ranking.findIndex((r) => r.name === playerName && r.score === totalScore);
  const myPosition = myIndex >= 0 ? myIndex + 1 : null;

  return (
    <div className="summary-container">
      <h2 className="summary-title">Resumo Final</h2>
      <p>Jogador: <strong>{playerName}</strong></p>
      <p>Pontuação total: <strong>{totalScore}</strong></p>

      <div className="breakdown">
        <h3>Desempenho por nível</h3>
        <ul>
          <li>Fácil — acertos: {breakdown.facil.acertos} | erros: {breakdown.facil.erros} | pontos: {breakdown.facil.pontos}</li>
          <li>Moderado — acertos: {breakdown.moderado.acertos} | erros: {breakdown.moderado.erros} | pontos: {breakdown.moderado.pontos}</li>
          <li>Difícil — acertos: {breakdown.dificil.acertos} | erros: {breakdown.dificil.erros} | pontos: {breakdown.dificil.pontos}</li>
        </ul>
      </div>

      {myPosition && <p className="my-position">Sua posição atual no ranking: <strong>{myPosition}º</strong></p>}

      <h3 className="ranking-title">🏆 Ranking</h3>
      <div className="leaderboard">
        {ranking.map((r, i) => (
          <div className="leaderboard-item" key={i}>
            <div><span className="rank">{i+1}º</span> <span className="player">{r.name}</span></div>
            <div className="score">{r.score} pts</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <button onClick={onRestart}>Jogar Novamente</button>
      </div>
    </div>
  );
}









