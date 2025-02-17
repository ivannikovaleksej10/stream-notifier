const config = require('./config/config');
const { checkStream } = require('./services/twitchService');
const { sendTelegramNotification } = require('./services/notificationService');

// Глобальный флаг для контроля отправки уведомления за один стрим
global.notificationSent = false;

// Объект для отслеживания состояния стрима
let streamState = { isLive: false };

async function main() {
  await checkStream(sendTelegramNotification, streamState);
}

setInterval(main, config.checkInterval);
main();
