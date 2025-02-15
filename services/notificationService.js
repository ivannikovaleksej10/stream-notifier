const { sendTelegramNotification } = require('./telegramService');
const { sendDiscordNotification } = require('./discordService');

async function notify(message) {
  await sendTelegramNotification(message);
  await sendDiscordNotification();
}

module.exports = { notify };
