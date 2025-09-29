// src/components/QuestionCard.js
import React, { useState } from "react";

export default function QuestionCard({ question, qNumber, total, onAnswer, onNext }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const letterToIndex = (letter) => {
    if (!letter) return -1;
    const L = letter.toString().trim().toUpperCase();
    return { A:0, B:1, C:2, D:3 }[L] ?? -1;
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
      <h3>
        {qNumber}. {question.pergunta}
      </h3>
      <ul>
        {question.opcoes.map((op, i) => {
          let className = "option";
          if (answered) {
            if (i === correctIdx) className += " correct";
            else if (i === selected && i !== correctIdx) className += " wrong";
          }
          return (
            <li
              key={i}
              className={className}
              onClick={() => handleClick(i)}
            >
              {op}
            </li>
          );
        })}
      </ul>

      {answered && (
        <button onClick={onNext} className="next-btn">Avançar</button>
      )}
    </div>
  );
}


