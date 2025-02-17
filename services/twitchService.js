const axios = require('axios');
const config = require('../config/config');

/**
 * Получение Twitch access token
 */
async function getTwitchAccessToken() {
  try {
    const response = await axios.post(
      `https://id.twitch.tv/oauth2/token?client_id=${config.twitch.clientId}&client_secret=${config.twitch.clientSecret}&grant_type=client_credentials`
    );
    config.twitch.accessToken = response.data.access_token;
    console.log("Получен Twitch access token");
  } catch (error) {
    console.error(
      "Ошибка при получении Twitch access token:",
      error.response ? error.response.data : error.message
    );
  }
}

/**
 * Проверка статуса стрима для канала, указанного в config.twitch.channelName.
 * Если стрим начался и уведомление еще не отправлялось, вызывается notifyCallback(message).
 * Флаг streamState.isLive и глобальный флаг global.notificationSent
 * гарантируют, что уведомление отправится только один раз за стрим.
 *
 * @param {Function} notifyCallback - функция для отправки уведомления всем пользователям.
 * @param {Object} streamState - объект для отслеживания состояния стрима.
 */
async function checkStream(notifyCallback, streamState) {
  // Дополнительная проверка, чтобы убедиться, что notifyCallback — функция
  if (typeof notifyCallback !== 'function') {
    console.error("Ошибка: notifyCallback не является функцией. Его тип:", typeof notifyCallback);
    return;
  }

  if (!config.twitch.accessToken) {
    await getTwitchAccessToken();
  }
  try {
    const response = await axios.get(
      `https://api.twitch.tv/helix/streams?user_login=${config.twitch.channelName}`,
      {
        headers: {
          'Client-ID': config.twitch.clientId,
          'Authorization': `Bearer ${config.twitch.accessToken}`
        }
      }
    );

    if (response.data.data && response.data.data.length > 0) {
      if (!streamState.isLive) {
        streamState.isLive = true;
        if (!global.notificationSent) {
          global.notificationSent = true;
          console.log("Стрим начался!");
          const message = `Стрим начался! <a href="https://twitch.tv/${config.twitch.channelName}">Заходите посмотреть!</a>`;
          notifyCallback(message);
        }
      }
    } else {
      if (streamState.isLive) {
        streamState.isLive = false;
        global.notificationSent = false;
        console.log("Стрим закончился.");
      }
    }
  } catch (error) {
    console.error(
      "Ошибка при проверке статуса стрима:",
      error.response ? error.response.data : error.message
    );
  }
}

module.exports = { getTwitchAccessToken, checkStream };
