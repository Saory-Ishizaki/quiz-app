// src/components/LevelResult.js
import React from "react";

export default function LevelResult({ levelLabel, acertos, erros, pontos, nextLabel, onAdvance, onQuit }) {
  return (
    <div className="level-result">
      <h2>Resultado — {levelLabel}</h2>
      <p>Acertos: <strong>{acertos}</strong></p>
      <p>Erros: <strong>{erros}</strong></p>
      <p>Pontos no nível: <strong>{pontos}</strong></p>

      <div style={{ marginTop: 12 }}>
        {nextLabel ? (
          <button onClick={onAdvance}>Avançar para {nextLabel}</button>
        ) : (
          <button onClick={onAdvance}>Ver Ranking / Finalizar</button>
        )}
        <button onClick={onQuit} style={{ marginLeft: 8 }}>Encerrar e Ver Resumo</button>
      </div>
    </div>
  );
}


