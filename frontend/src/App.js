// src/App.js
import React, { useEffect, useState } from "react";
import { getPerguntas, sendScore } from "./api";
import QuestionCard from "./components/QuestionCard";
import LevelResult from "./components/LevelResult";
import FinalSummary from "./components/FinalSummary";
import RankingBoard from "./components/RankingBoard";
import CoinRain from "./components/CoinRain";
import "./index.css";

const LEVELS = [
  { key: "facil", label: "Fácil", peso: 1 },
  { key: "moderado", label: "Moderado", peso: 2 },
  { key: "dificil", label: "Difícil", peso: 3 },
];

function normalizeQuestion(raw, fallbackPeso) {
  // aceita variações do JSON
  const perguntaText = raw.pergunta || raw.Pergunta || raw.question || "";
  const opcoes =
    raw.opcoes ||
    [raw.A, raw.B, raw.C, raw.D].filter((x) => x !== undefined && x !== null);
  const resposta = (raw.resposta || raw.Resposta || raw.answer || "").toString().trim();
  const peso = raw.peso ?? fallbackPeso;
  return { pergunta: perguntaText, opcoes, resposta, peso };
}

export default function App() {
  const [stage, setStage] = useState("welcome"); // welcome|loading|playing|levelResult|final
  const [nivelIndex, setNivelIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);

  const [inputName, setInputName] = useState("");
  const [playerName, setPlayerName] = useState("");

  const [perLevelStats, setPerLevelStats] = useState({
    facil: { acertos: 0, erros: 0, pontos: 0 },
    moderado: { acertos: 0, erros: 0, pontos: 0 },
    dificil: { acertos: 0, erros: 0, pontos: 0 },
  });
  const [totalScore, setTotalScore] = useState(0);
  const [showRanking, setShowRanking] = useState(false);

  async function loadLevel(nIndex) {
    const level = LEVELS[nIndex];
    setStage("loading");
    try {
      const raw = await getPerguntas(level.key);
      let arr = Array.isArray(raw) ? raw : [];
      arr = arr.slice(0, 10).map((r) => normalizeQuestion(r, level.peso));
      setQuestions(arr);
      setQIndex(0);
      setStage("playing");
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar perguntas. Veja o console.");
      setStage("welcome");
    }
  }

  function startGame() {
    if (!inputName.trim()) {
      alert("Digite seu nome para começar!");
      return;
    }
    setPlayerName(inputName.trim());
    setNivelIndex(0);
    setPerLevelStats({
      facil: { acertos: 0, erros: 0, pontos: 0 },
      moderado: { acertos: 0, erros: 0, pontos: 0 },
      dificil: { acertos: 0, erros: 0, pontos: 0 },
    });
    setTotalScore(0);
    loadLevel(0);
  }

  // chamado por QuestionCard quando jogador responde (não avança automaticamente)
  function handleAnswer(isCorrect, peso) {
    const levelKey = LEVELS[nivelIndex].key;
    setPerLevelStats((prev) => {
      const copy = { ...prev };
      copy[levelKey] = { ...copy[levelKey] };
      if (isCorrect) {
        copy[levelKey].acertos += 1;
        copy[levelKey].pontos += peso;
      } else {
        copy[levelKey].erros += 1;
      }
      return copy;
    });
    if (isCorrect) setTotalScore((s) => s + peso);
  }

  // avança pergunta
  function nextQuestion() {
    const next = qIndex + 1;
    if (next < questions.length) {
      setQIndex(next);
    } else {
      setStage("levelResult");
    }
  }

  // avança de nível (ou finaliza se já for o último)
  async function handleAdvance() {
    const nextLevel = nivelIndex + 1;
    if (nextLevel < LEVELS.length) {
      setNivelIndex(nextLevel);
      loadLevel(nextLevel);
    } else {
      // último nível concluído: enviar pontuação e ir para final
      try {
        await sendScore(playerName, totalScore);
      } catch (e) {
        console.warn("Erro ao enviar pontuação:", e);
      }
      setStage("final");
    }
  }

  function handleQuitToFinal() {
    sendScore(playerName, totalScore).catch(() => {});
    setStage("final");
  }

  function handleRestart() {
    setStage("welcome");
    setNivelIndex(0);
    setQuestions([]);
    setQIndex(0);
    setPlayerName("");
    setInputName("");
    setPerLevelStats({
      facil: { acertos: 0, erros: 0, pontos: 0 },
      moderado: { acertos: 0, erros: 0, pontos: 0 },
      dificil: { acertos: 0, erros: 0, pontos: 0 },
    });
    setTotalScore(0);
    setShowRanking(false);
  }

  return (
    <div className="app-container">
      <h1 className="game-title">Quem Acerta, Fatura!</h1>
      <p className="subtitle">Quiz de Educação Financeira</p>

      {stage === "welcome" && (
        <div className="welcome-screen">
          <input
            type="text"
            placeholder="Digite seu nome"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <button onClick={startGame}>Iniciar (Nível Fácil)</button>
        </div>
      )}

      {stage === "loading" && <p>Carregando perguntas...</p>}

      {stage === "playing" && questions.length > 0 && (
        <>
          <div className="status-bar">
            <strong>Jogador:</strong> {playerName} | <strong>Nível:</strong>{" "}
            {LEVELS[nivelIndex].label} | <strong>Pontuação:</strong> {totalScore}
          </div>

          <QuestionCard
            question={questions[qIndex]}
            qNumber={qIndex + 1}
            total={questions.length}
            onAnswer={handleAnswer}
            onNext={nextQuestion}
          />
        </>
      )}

      {stage === "levelResult" && (
        <LevelResult
          levelLabel={LEVELS[nivelIndex].label}
          acertos={perLevelStats[LEVELS[nivelIndex].key].acertos}
          erros={perLevelStats[LEVELS[nivelIndex].key].erros}
          pontos={perLevelStats[LEVELS[nivelIndex].key].pontos}
          nextLabel={LEVELS[nivelIndex + 1] ? LEVELS[nivelIndex + 1].label : null}
          onAdvance={handleAdvance}
          onQuit={handleQuitToFinal}
        />
      )}

      {stage === "final" && (
        <>
          <CoinRain />
          <FinalSummary
            playerName={playerName}
            breakdown={perLevelStats}
            totalScore={totalScore}
            onRestart={handleRestart}
          />

          <div style={{ marginTop: 12 }}>
            <button onClick={() => setShowRanking((s) => !s)}>
              {showRanking ? "Fechar Ranking" : "Ver Ranking"}
            </button>
          </div>

          {showRanking && <RankingBoard />}
        </>
      )}
    </div>
  );
}








