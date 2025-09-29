// src/api.js
import { io } from "socket.io-client";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
export const socket = io(BACKEND_URL, { transports: ["websocket", "polling"] });

export async function getPerguntas(nivel) {
  const res = await fetch(`${BACKEND_URL}/perguntas/${nivel}`);
  if (!res.ok) throw new Error("Erro ao buscar perguntas");
  return res.json();
}

export async function sendScore(name, score) {
  await fetch(`${BACKEND_URL}/ranking`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, score }),
  });
}

export async function fetchRanking() {
  const res = await fetch(`${BACKEND_URL}/ranking`);
  if (!res.ok) return [];
  return res.json();
}

