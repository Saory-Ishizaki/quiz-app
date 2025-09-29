const express = require("express");
const cors = require("cors");
const fs = require("fs");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

const PORT = 5000;

// 🔹 Ranking salvo em arquivo JSON
const RANKING_FILE = "./ranking.json";

// Carrega ranking do arquivo ou cria vazio
function loadRanking() {
  try {
    return JSON.parse(fs.readFileSync(RANKING_FILE, "utf8"));
  } catch (e) {
    return [];
  }
}

function saveRanking(ranking) {
  fs.writeFileSync(RANKING_FILE, JSON.stringify(ranking, null, 2));
}

// Endpoint para obter ranking inicial
app.get("/ranking", (req, res) => {
  res.json(loadRanking());
});

// Endpoint para enviar resultado (se quiser HTTP)
app.post("/ranking", (req, res) => {
  const { name, score } = req.body;
  let ranking = loadRanking();

  ranking.push({ name, score, date: new Date().toISOString() });
  ranking = ranking.sort((a, b) => b.score - a.score).slice(0, 10);

  saveRanking(ranking);

  // 🔹 Notifica todos em tempo real
  io.emit("rankingUpdate", ranking);

  res.json(ranking);
});

// 🔹 WebSocket para atualizações em tempo real
io.on("connection", (socket) => {
  console.log("Novo jogador conectado!");

  // envia ranking atual ao novo cliente
  socket.emit("rankingUpdate", loadRanking());

  socket.on("disconnect", () => {
    console.log("Jogador saiu.");
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});