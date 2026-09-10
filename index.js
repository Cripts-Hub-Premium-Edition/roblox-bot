const noblox = require("noblox.js");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("¡El bot está activo!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor web interno corriendo en el puerto ${PORT}`);
});

const COOKIE = process.env.COOKIE;
const PLACE_ID = process.env.PLACE_ID;
const JOB_ID = process.env.JOB_ID;

async function startBot() {
    try {
        console.log("Iniciando sesión con la cookie del bot...");
        const currentUser = await noblox.setCookie(COOKIE);
        console.log(`¡Conectado exitosamente como: ${currentUser.UserName}!`);

        setInterval(async () => {
            try {
                await noblox.joinGame(Number(PLACE_ID), JOB_ID);
                console.log("¡El bot se ha unido al servidor correctamente!");
            } catch (joinErr) {
                console.error("Error al unirse al juego:", joinErr);
            }
        }, 60000 * 5);

        await noblox.joinGame(Number(PLACE_ID), JOB_ID);
        console.log("¡Primer intento de unión ejecutado!");
    } catch (err) {
        console.error("Error crítico:", err);
    }
}

startBot();
