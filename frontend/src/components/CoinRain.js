// src/components/CoinRain.js
import React, { useEffect, useState } from "react";

export default function CoinRain() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 16; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2,
        scale: 0.7 + Math.random() * 0.8,
      });
    }
    setCoins(arr);
  }, []);

  return (
    <div className="coin-rain" aria-hidden>
      {coins.map(c => (
        <div
          key={c.id}
          className="coin"
          style={{
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
            transform: `scale(${c.scale})`,
          }}
        >
          {/* SVG moeda dourada simples */}
          <svg width="36" height="36" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
              <radialGradient id={`g${c.id}`} cx="30%" cy="30%">
                <stop offset="0%" stopColor="#fff8c4" />
                <stop offset="60%" stopColor="#ffd24d" />
                <stop offset="100%" stopColor="#b8860b" />
              </radialGradient>
            </defs>
            <circle cx="32" cy="32" r="28" fill={`url(#g${c.id})`} stroke="#8b6508" strokeWidth="2" />
            <text x="32" y="38" fontSize="20" fontWeight="700" textAnchor="middle" fill="#6b4200">$</text>
          </svg>
        </div>
      ))}
    </div>
  );
}
