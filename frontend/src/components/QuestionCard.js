// src/components/QuestionCard.js
import React, { useState } from "react";

export default function QuestionCard({ question, qNumber, total, onAnswer, onNext }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const letterToIndex = (letter) => {
    if (!letter) return -1;
    const L = letter.toString().trim().toUpperCase();
    return { A: 0, B: 1, C: 2, D: 3 }[L] ?? -1;
  };

  const correctIdx = letterToIndex(question.resposta);

  function handleClick(i) {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    const isCorrect = i === correctIdx;
    onAnswer(isCorrect, question.peso);
  }

  return (
    <div className="question-card">
      <h3>{qNumber}. {question.pergunta}</h3>
      <ul className="options-list">
        {question.opcoes.map((op, i) => {
          let cls = "option";
          if (answered) {
            if (i === correctIdx) cls += " correct";
            else if (i === selected && i !== correctIdx) cls += " wrong";
            else cls += " disabled";
          }
          return (
            <li
              key={i}
              className={cls}
              onClick={() => handleClick(i)}
              role="button"
              tabIndex={0}
            >
              <span className="opt-letter">{["A","B","C","D"][i] || ""}</span>
              <span className="opt-text">{op}</span>
            </li>
          );
        })}
      </ul>

      {answered && (
        <div style={{ marginTop: 12 }}>
          <button className="next-btn" onClick={() => { setSelected(null); setAnswered(false); onNext(); }}>
            Avançar ➡️
          </button>
        </div>
      )}
    </div>
  );
}




