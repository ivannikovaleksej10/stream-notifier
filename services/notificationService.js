const axios = require('axios');
const db = require('../db/database');
const config = require('../config/config');

function sendTelegramNotification(message) {
  db.all('SELECT chat_id FROM users', (err, rows) => {
    if (err) {
      console.error("Ошибка при получении пользователей из базы данных:", err.message);
      return;
    }
    if (rows.length === 0) {
      console.log("Нет пользователей для отправки уведомлений.");
      return;
    }
    rows.forEach((user) => {
      axios.post(`https://api.telegram.org/bot${config.telegram.botToken}/sendMessage`, {
        chat_id: user.chat_id,
        text: message,
        parse_mode: "HTML"
      })
      .then(() => {
        console.log(`Уведомление отправлено пользователю ${user.chat_id}`);
      })
      .catch(error => {
        console.error(`Ошибка при отправке уведомления пользователю ${user.chat_id}:`,
          error.response ? error.response.data : error.message);
      });
    });
  });
}

module.exports = { sendTelegramNotification };
