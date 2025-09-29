// src/components/Leaderboard.js
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Leaderboard() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    socket.on("rankingUpdate", (data) => {
      setRanking(data);
    });

    return () => {
      socket.off("rankingUpdate");
    };
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #ffd700, #daa520)",
        color: "black",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.5)",
        maxWidth: "300px",
        margin: "20px auto"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "15px", color: "#004d00" }}>
        🏆 Ranking
      </h2>
      <ol style={{ paddingLeft: "20px", textAlign: "left" }}>
        {ranking.length === 0 && <p>Ninguém no ranking ainda...</p>}
        {ranking.map((player, index) => (
          <li
            key={index}
            style={{
              fontSize: "1rem",
              marginBottom: "8px",
              fontWeight: index === 0 ? "bold" : "normal",
              color: index === 0 ? "#004d00" : "black"
            }}
          >
            {player.name} — <strong>{player.score}</strong> pontos
          </li>
        ))}
      </ol>
    </div>
  );
}

