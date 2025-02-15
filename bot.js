const TelegramBot = require('node-telegram-bot-api');
const db = require('./db/database');
const config = require('./config/config');

const ADMIN_CHAT_ID = 123456789; // Укажите ваш Telegram ID
const GITHUB_LINK = "https://github.com/ivannikovaleksej10/stream-notifier"; // Укажите ссылку на ваш GitHub
const TWITCH_LINK = "https://www.twitch.tv/legendaafk";

const TOKEN = config.telegram.botToken;
const bot = new TelegramBot(TOKEN, { polling: true });

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  db.get('SELECT chat_id FROM users WHERE chat_id = ?', [chatId], (err, row) => {
    if (err) {
      console.error("Ошибка при проверке пользователя в базе:", err.message);
      return;
    }

    if (!row) {
      // Добавляем пользователя в базу и отправляем приветственное сообщение
      db.run('INSERT INTO users (chat_id) VALUES (?)', [chatId], (insertErr) => {
        if (insertErr) {
          console.error("Ошибка при добавлении пользователя в базу:", insertErr.message);
        } else {
          bot.sendMessage(
            chatId,
            "👋 Привет! Теперь ты подписан на уведомления о начале стрима. 🎥"
          );
        }
      });
    } else {
      // Если пользователь уже подписан, отправляем сообщение с кнопками
      bot.sendMessage(chatId, "✅ Вы уже подписаны на уведомления.", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "🔗 GitHub проекта", url: GITHUB_LINK }],
            [{ text: "ℹ Информация", callback_data: "info" }]
          ]
        }
      });
    }
  });
});

// Обработчик нажатия на кнопку "ℹ Информация"
bot.on("callback_query", (query) => {
    if (query.data === "info") {
      bot.sendMessage(
        query.message.chat.id,
        `📢 <b>Этот бот уведомляет о начале стримов на Twitch!</b>\n\n` +
        `🎮 Канал: <a href="${TWITCH_LINK}">legendaafk</a> (второй канал Братишкина)\n\n` +
        `🛠 Изначально бот был создан только для меня, потому что нигде не было уведомлений о данном канале. ` +
        `Но теперь им могут пользоваться все!\n\n` +
        `💻 Исходный код доступен для всех: <a href="${GITHUB_LINK}">GitHub проекта</a>\n\n` +
        `🔔 Просто подпишись, и ты не пропустишь начало стрима!`,
        { parse_mode: "HTML", disable_web_page_preview: true }
      );
    }
  });
  
// Обработчик команды /info (дублирует информацию)
bot.onText(/\/info/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        `📢 <b>Этот бот уведомляет о начале стримов на Twitch!</b>\n\n` +
        `🎮 Канал: <a href="${TWITCH_LINK}">legendaafk</a> (второй канал Братишкина)\n\n` +
        `🛠 Изначально бот был создан только для меня, потому что нигде не было уведомлений о данном канале. ` +
        `Но теперь им могут пользоваться все!\n\n` +
        `💻 Исходный код доступен для всех: <a href="${GITHUB_LINK}">GitHub проекта</a>\n\n` +
        `🔔 Просто подпишись, и ты не пропустишь начало стрима!`,
        { parse_mode: "HTML", disable_web_page_preview: true }
    );
});

// Обработка команды /stats (только для администратора)
bot.onText(/\/stats/, (msg) => {
  const chatId = msg.chat.id;

  if (chatId !== ADMIN_CHAT_ID) {
    return bot.sendMessage(chatId, "⛔ У вас нет прав на просмотр статистики.");
  }

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

// Обработчик команды /broadcast для рассылки сообщений всем пользователям (только для администратора)
bot.onText(/\/broadcast (.+)/, (msg, match) => {
  const senderChatId = msg.chat.id;
  
  if (senderChatId !== ADMIN_CHAT_ID) {
    return bot.sendMessage(senderChatId, "⛔ У вас нет прав для выполнения этой команды.");
  }

  const broadcastMessage = match[1];

  db.all('SELECT chat_id FROM users', (err, rows) => {
    if (err) {
      console.error("Ошибка при получении пользователей для рассылки:", err.message);
      return bot.sendMessage(senderChatId, "Ошибка при получении пользователей для рассылки.");
    }

    // Отправляем сообщение каждому пользователю
    rows.forEach((user) => {
      bot.sendMessage(user.chat_id, broadcastMessage, { parse_mode: "HTML" })
        .catch(error => console.error(`Ошибка при отправке сообщения пользователю ${user.chat_id}:`, error.message));
    });

    bot.sendMessage(senderChatId, `✅ Рассылка отправлена ${rows.length} пользователям.`);
  });
});

console.log('Telegram бот запущен и готов принимать команды...');
