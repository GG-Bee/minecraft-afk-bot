const mineflayer = require('mineflayer');

const config = {
  host: process.env.MC_HOST || 'gastroistgeil.play.hosting',
  port: Number(process.env.MC_PORT || 25577),
  username: process.env.MC_USERNAME || 'AFKGuard',
  auth: process.env.MC_AUTH || 'offline',
  version: process.env.MC_VERSION || false
};

let bot, reconnectTimer, movementTimer, stopping = false;
let reconnectDelay = 10000;
const log = (...a) => console.log(new Date().toISOString(), ...a);

function clearTimers() {
  if (reconnectTimer) clearTimeout(reconnectTimer);
  if (movementTimer) clearInterval(movementTimer);
  reconnectTimer = movementTimer = undefined;
}
function scheduleReconnect() {
  if (stopping || reconnectTimer) return;
  log(`Neuer Verbindungsversuch in ${Math.round(reconnectDelay / 1000)} Sekunden.`);
  reconnectTimer = setTimeout(() => { reconnectTimer = undefined; connect(); }, reconnectDelay);
  reconnectDelay = Math.min(Math.round(reconnectDelay * 1.5), 120000);
}
function startMovement() {
  movementTimer = setInterval(() => {
    if (!bot || !bot.entity) return;
    bot.clearControlStates();
    if (Math.random() < 0.7) {
      bot.look(Math.random() * Math.PI * 2 - Math.PI, (Math.random() - 0.5) * 0.45, true).catch(() => {});
    } else {
      const direction = ['forward', 'back', 'left', 'right'][Math.floor(Math.random() * 4)];
      bot.setControlState(direction, true);
      if (Math.random() < 0.2) bot.setControlState('jump', true);
      setTimeout(() => { if (bot && bot.entity) bot.clearControlStates(); }, 800 + Math.random() * 1800);
    }
  }, 8000 + Math.random() * 4000);
}
function connect() {
  if (stopping) return;
  clearTimers();
  log(`Verbinde mit ${config.host}:${config.port} als ${config.username} ...`);
  try {
    bot = mineflayer.createBot({
      host: config.host, port: config.port, username: config.username,
      auth: config.auth, version: config.version
    });
  } catch (e) {
    log('Verbindungsstart fehlgeschlagen:', e.message);
    scheduleReconnect();
    return;
  }
  bot.once('spawn', () => { reconnectDelay = 10000; log('Verbunden. AFK-Bewegung gestartet.'); startMovement(); });
  bot.on('kicked', reason => log('Vom Server gekickt:', reason));
  bot.on('error', err => log('Minecraft-Fehler:', err.message));
  bot.on('end', () => { log('Verbindung beendet.'); clearTimers(); bot = undefined; scheduleReconnect(); });
}
function shutdown() {
  stopping = true; clearTimers();
  if (bot) bot.quit('Bot wird beendet');
  setTimeout(() => process.exit(0), 250);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
connect();
