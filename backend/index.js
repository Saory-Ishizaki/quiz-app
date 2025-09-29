// backend/index.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const PORT = process.env.PORT || 5000;
const PERG_FILE = path.join(__dirname, "perguntas.json");
const RANK_FILE = path.join(__dirname, "ranking.json");

// Helpers
function loadJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    return fallback;
  }
}
function saveJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Endpoint: retorna 10 perguntas aleatórias de um nível
app.get("/perguntas/:nivel", (req, res) => {
  const nivel = req.params.nivel; // "facil" | "moderado" | "dificil"
  const all = loadJson(PERG_FILE, {});
  const arr = Array.isArray(all[nivel]) ? all[nivel] : [];
  // embaralhar e pegar 10
  const shuffled = arr.slice().sort(() => Math.random() - 0.5).slice(0, 10);
  res.json(shuffled);
});

// Ranking (GET)
app.get("/ranking", (req, res) => {
  const ranking = loadJson(RANK_FILE, []);
  res.json(ranking);
});

// Ranking (POST) - adiciona resultado e emite update
app.post("/ranking", (req, res) => {
  const { name, score } = req.body;
  if (!name) return res.status(400).json({ error: "name required" });
  const ranking = loadJson(RANK_FILE, []);
  ranking.push({ name, score: Number(score) || 0, date: new Date().toISOString() });
  ranking.sort((a, b) => b.score - a.score);
  const top = ranking.slice(0, 50);
  saveJson(RANK_FILE, top);

  // Notifica todos os clientes conectados
  io.emit("rankingUpdate", top);

  res.json(top);
});

// WebSocket: envia ranking atual quando alguém conecta
io.on("connection", (socket) => {
  console.log("Socket conectado:", socket.id);
  socket.emit("rankingUpdate", loadJson(RANK_FILE, []));
  socket.on("disconnect", () => {
    console.log("Socket desconectado:", socket.id);
  });
});

// Iniciar
server.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});




