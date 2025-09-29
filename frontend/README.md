🎮 Quem Acerta, Fatura!

Quiz de Educação Financeira com níveis de dificuldade e ranking em tempo real.

📌 Funcionalidades

3 níveis de dificuldade: Fácil, Moderado, Difícil.

Cada nível tem 50 perguntas no banco (são sorteadas 10 para cada jogador).

Perguntas não se repetem em uma mesma partida.

Resposta correta aparece em verde e errada em vermelho.

Sistema de pontuação com peso por nível (Fácil = 1, Moderado = 2, Difícil = 3).

Exibe resumo de acertos/erros ao final de cada nível.

Ranking em tempo real com outros jogadores (via WebSocket / Socket.IO).

Tema visual em verde e dourado (dinheiro + ouro).

Animação com moedas caindo no final do jogo.

🛠️ Tecnologias

Frontend: React + Socket.IO Client

Backend: Node.js + Express + Socket.IO

Banco de dados: Arquivo JSON para ranking (ranking.json)

Estilo: CSS com elementos vetoriais (moedas, roleta, dourado/verde)

🚀 Rodando localmente
1. Clonar repositório
git clone https://github.com/Saory-Massakydo/quiz-app.git
cd quiz-app

2. Rodar o Backend
cd backend
npm install
node index.js


Backend vai rodar em http://localhost:5000

3. Rodar o Frontend

Em outro terminal:

cd frontend
npm install
npm start


Frontend vai rodar em http://localhost:3000

🌍 Deploy (para jogar com amigos)
Backend (Node.js + Socket.IO)

Criar conta no Render
 ou Railway
.

Criar um novo Web Service e importar a pasta backend/.

Configurar:

Start command:

node index.js


Porta: 5000 (Render define PORT automaticamente → no código já está ajustado).

Pegar a URL pública, algo como:

https://quiz-backend.onrender.com

Frontend (React)

Criar conta no Vercel
 ou Netlify
.

Criar um projeto e importar a pasta frontend/.

Antes do deploy, editar src/api.js e trocar:

const BASE_URL = "http://localhost:5000";


para:

const BASE_URL = "https://quiz-backend.onrender.com"; // sua URL do backend


Deploy → Vercel/Netlify vai gerar um link público como:

https://quem-acerta-fatura.vercel.app

✅ Pronto!

Agora qualquer pessoa pode acessar o link e jogar.
O ranking vai funcionar em tempo real entre todos os jogadores conectados.

👥 Créditos

Acadêmicos de Contabilidade - UNAMA (criação do conteúdo)

Saory M. Ishizaki (Acadêmica de Ciência da Computação - UNINTER) — desenvolvimento

✨ Bom jogo!
📌 “Quem Acerta, Fatura!” — Aprender sobre finanças nunca foi tão divertido!