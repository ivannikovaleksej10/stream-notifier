# Twitch Stream Notifier (afknotify)

Приложение на Node.js для мониторинга Twitch-канала и отправки уведомлений о начале стрима в Telegram и Discord. Приложение использует Twitch API для проверки статуса стрима, Telegram Bot API и Discord вебхуки для уведомлений, а также SQLite для хранения подписанных пользователей.

*Написал софтинку по большей части для себя, чтобы получать уведомления от определенного стримера в тг и дс одновременно. Возможно, буду развивать этот проект, но ничего не обещаю.*

## Функциональность

- **Мониторинг Twitch**: Проверяет, идет ли стрим на заданном канале.
- **Уведомления в Telegram**: Отправляет сообщение с HTML-ссылкой на Twitch-канал всем подписанным пользователям.
- **Уведомления в Discord**: Отправляет embed-сообщение с кликабельной ссылкой на Twitch-канал.
- **Хранение подписчиков**: Использует SQLite для сохранения chat_id пользователей, отправивших сообщение боту.

## Предварительные требования

- [Node.js](https://nodejs.org/) (рекомендуется последняя LTS версия)
- Twitch Developer аккаунт для получения `clientId` и `clientSecret`
- Telegram-бот, созданный через [@BotFather](https://t.me/BotFather), с полученным токеном
- Discord вебхук для нужного канала
- SQLite (используется через npm пакет `sqlite3`)

## Установка и запуск

1. **Клонируйте репозиторий:**

   ```bash
   git clone https://github.com/yourusername/stream-notifier.git
   cd stream-notifier

2. **Установите зависимости:**
    ```bash
    npm install

3. **Настройте конфигурацию:**
    Отредактируйте файл .env.txt, замените заглушки на свои данные и сохраните под названием .env;
    Отредактируйте файл bot.js, замените айди админа и ссылку на стримера;

4. **Запустите Telegram-бота:**
    ```bash
    npm run bot

5. **Запустите основной модуль мониторинга стрима:**
    ```bash
    npm start