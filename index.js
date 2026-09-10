const noblox = require("noblox.js");
const express = require("express");
const app = express();

// Servidor web simple para mantener activo a Render y evitar que se duerma
app.get("/", (req, res) => {
    res.send("¡El bot de BotKiller6769 está activo y funcionando!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor web interno corriendo en el puerto ${PORT}`);
});

// Configuración de la cuenta secundaria (BotKiller6769)
const COOKIE = "AQUÍ_PEGA_TU_COOKIE_.ROBLOSECURITY_LARGA"; 
const PLACE_ID = 0000000000; // <-- Cambia por el ID del juego (PlaceId)
const JOB_ID = "AQUÍ_EL_JOB_ID_DEL_SERVIDOR"; // <-- Cambia por el JobId exacto de tu servidor

async function startBot() {
    try {
        console.log("Iniciando sesión con la cookie del bot...");
        const currentUser = await noblox.setCookie(COOKIE);
        console.log(`¡Conectado exitosamente como: ${currentUser.UserName} (ID: ${currentUser.UserID})!`);

        // Bucle para unirse y reintentar si se desconecta
        setInterval(async () => {
            try {
                console.log("Intentando unir al bot al servidor de juego...");
                await noblox.joinGame(PLACE_ID, JOB_ID);
                console.log("¡El bot se ha unido al servidor correctamente!");
            } catch (joinErr) {
                console.error("Error al intentar unirse al juego:", joinErr);
            }
        }, 60000 * 5); // Intenta unirse o re-verificar cada 5 minutos

        // Primer intento inmediato de unión al arrancar
        await noblox.joinGame(PLACE_ID, JOB_ID);
        console.log("¡Primer intento de unión ejecutado!");

    } catch (err) {
        console.error("Error crítico en el inicio de sesión del bot:", err);
    }
}

startBot();
