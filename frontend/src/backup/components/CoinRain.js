// src/components/CoinRain.js
import React, { useEffect, useState } from "react";
import "./CoinRain.css";

export default function CoinRain() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 15; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100, // posição horizontal
        delay: Math.random() * 5,  // delay para cair
        duration: 3 + Math.random() * 2, // velocidade
      });
    }
    setCoins(arr);
  }, []);

  return (
    <div className="coin-rain">
      {coins.map(c => (
        <div
          key={c.id}
          className="coin"
          style={{
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`
          }}
        >
          💰
        </div>
      ))}
    </div>
  );
}
