require('dotenv').config(); // Загружает переменные из .env

module.exports = {
    twitch: {
      channelName: 'LegendaAFK',       // Имя отслеживаемого канала на Twitch
      clientId: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      accessToken: null,
    },
    telegram: {
      botToken: process.env.BOTTOKEN,
    },
    discord: {
      webhookUrl: process.env.WEBHOOK,
    },
    checkInterval: 60000,  // Интервал проверки (в миллисекундах)
  };
  