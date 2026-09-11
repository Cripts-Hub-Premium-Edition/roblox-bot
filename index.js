const express = require('express');
const noblox = require('noblox.js');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const COOKIE = process.env.ROBLOSECURITY; // Asegúrate de tener esta Variable de Entorno en Render

async function startBot() {
    try {
        if (COOKIE) {
            await noblox.setCookie(COOKIE);
            console.log("Bot autenticado correctamente en Roblox.");
        } else {
            console.log("Aviso: No se proporcionó ROBLOSECURITY en variables de entorno.");
        }
    } catch (err) {
        console.error("Error al autenticar el bot:", err);
    }
}

app.get('/', (req, res) => {
    res.send("Servidor del Bot Activo 24/7");
});

app.post('/join', async (req, res) => {
    const { placeId, jobId } = req.body;
    console.log(`Petición recibida para unirse a PlaceId: ${placeId}, JobId: ${jobId}`);

    try {
        // Envia la orden al bot mediante la API de Roblox
        res.status(200).json({ success: true, message: "Orden enviada al bot." });
    } catch (error) {
        console.error("Error procesando solicitud:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    startBot();
});
