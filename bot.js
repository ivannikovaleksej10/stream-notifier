const TelegramBot = require('node-telegram-bot-api');
const db = require('./db/database');
const config = require('./config/config');

const ADMIN_CHAT_ID = 210897312; // Укажите ваш Telegram ID

const TOKEN = config.telegram.botToken;
const bot = new TelegramBot(TOKEN, { polling: true });

// Добавление нового пользователя в базу
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // Добавляем пользователя в базу, если его там ещё нет
  db.run('INSERT OR IGNORE INTO users (chat_id) VALUES (?)', [chatId], function (err) {
    if (err) {
      console.error("Ошибка при добавлении пользователя в базу:", err.message);
    }
  });

  bot.sendMessage(chatId, 'Вы подписаны на уведомления о стриме.');
});

// Обработка команды /stats (только для администратора)
bot.onText(/\/stats/, (msg) => {
  const chatId = msg.chat.id;

  if (chatId !== ADMIN_CHAT_ID) {
    return bot.sendMessage(chatId, "У вас нет прав на просмотр статистики.");
  }

  // Получаем количество подписанных пользователей
  db.get('SELECT COUNT(*) AS count FROM users', (err, row) => {
    if (err) {
      return bot.sendMessage(chatId, "Ошибка при получении статистики.");
    }

    bot.sendMessage(
      chatId,
      `📊 *Статистика бота:*\n\n👥 Подписчиков: *${row.count}*`,
      { parse_mode: "Markdown" }
    );
  });
});

console.log('Telegram бот запущен и готов принимать сообщения...');
