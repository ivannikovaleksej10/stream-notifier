const axios = require('axios');
const db = require('../db/database');
const config = require('../config/config');

async function sendTelegramNotification(message) {
  // Оборачиваем выборку пользователей в промис
  const getUsers = () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT chat_id FROM users', (err, rows) => {
        if (err) {
          console.error("Ошибка при получении пользователей из базы данных:", err.message);
          return reject(err);
        }
        resolve(rows);
      });
    });
  };

  try {
    const users = await getUsers();
    if (users.length === 0) {
      console.log("Нет пользователей для отправки уведомлений.");
      return;
    }
    for (const user of users) {
      try {
        await axios.post(`https://api.telegram.org/bot${config.telegram.botToken}/sendMessage`, {
          chat_id: user.chat_id,
          text: message,
          parse_mode: "HTML" // Включаем поддержку HTML (для кликабельной ссылки)
        });
        console.log(`Уведомление Telegram отправлено пользователю ${user.chat_id}`);
      } catch (error) {
        console.error(
          `Ошибка при отправке уведомления пользователю ${user.chat_id}:`,
          error.response ? error.response.data : error.message
        );
      }
    }
  } catch (err) {
    console.error("Ошибка при обработке пользователей:", err);
  }
}

module.exports = { sendTelegramNotification };
