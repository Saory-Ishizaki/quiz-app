// src/components/LevelResult.js
import React from "react";

export default function LevelResult({ levelLabel, acertos, erros, pontos, nextLabel, onAdvance, onQuit }) {
  return (
    <div>
      <h2>Resumo do Nível {levelLabel}</h2>
      <p>Acertos: {acertos} | Erros: {erros} | Pontos: {pontos}</p>
      {nextLabel ? (
        <button onClick={onAdvance}>
          {nextLabel}
        </button>
      ) : (
        <button onClick={onQuit}>Finalizar</button>
      )}
    </div>
  );
}

