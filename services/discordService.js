const axios = require('axios');
const config = require('../config/config');

async function sendDiscordNotification() {
  try {
    await axios.post(config.discord.webhookUrl, {
      embeds: [
        {
          title: "Стрим начался!",
          description: `[Заходите посмотреть!](https://twitch.tv/${config.twitch.channelName})`,
          color: 6570404 // Можно задать свой цвет
        }
      ]
    });
    console.log("Уведомление Discord отправлено");
  } catch (error) {
    console.error(
      "Ошибка при отправке уведомления в Discord:",
      error.response ? error.response.data : error.message
    );
  }
}

module.exports = { sendDiscordNotification };
