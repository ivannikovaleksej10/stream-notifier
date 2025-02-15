const TelegramBot = require('node-telegram-bot-api');
const db = require('./db/database');
const config = require('./config/config');

const TOKEN = config.telegram.botToken;
const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  // Вставляем chat_id в таблицу, если его там ещё нет
  db.run('INSERT OR IGNORE INTO users (chat_id) VALUES (?)', [chatId], function(err) {
    if (err) {
      console.error("Ошибка при добавлении пользователя в базу данных:", err.message);
    } else {
      if (this.changes > 0) {
        console.log(`Пользователь ${chatId} добавлен в базу данных.`);
      } else {
        console.log(`Пользователь ${chatId} уже есть в базе данных.`);
      }
    }
  });
  bot.sendMessage(chatId, 'Вы подписаны на уведомления о стриме.');
});

console.log('Telegram бот запущен и готов принимать сообщения...');
