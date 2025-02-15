const config = require('./config/config');
const { checkStream } = require('./services/twitchService');
const { notify } = require('./services/notificationService');

// Объект для отслеживания состояния стрима
const streamState = { isLive: false };

async function main() {
  await checkStream(notify, streamState);
}

// Запускаем проверку через заданный интервал
setInterval(main, config.checkInterval);

// Первый запуск сразу после старта приложения
main();
