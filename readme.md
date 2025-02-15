# Twitch Stream Notifier [(afknotify)](@afknotify_bot)
![License](https://img.shields.io/github/license/ivannikovaleksej10/stream-notifier)
![Language](https://img.shields.io/github/languages/top/ivannikovaleksej10/stream-notifier)
![Last Commit](https://img.shields.io/github/last-commit/ivannikovaleksej10/stream-notifier)
![Size](https://img.shields.io/github/repo-size/ivannikovaleksej10/stream-notifier)


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
   git clone https://github.com/ivannikovaleksej10/stream-notifier.git
   cd stream-notifier

2. **Установите зависимости:**
    ```bash
    npm install

3. **Настройте конфигурацию:**
   
    Отредактируйте файл .env.txt, замените заглушки на свои данные и сохраните под названием .env;
   
    Отредактируйте файл bot.js, замените айди админа и ссылку на стримера;

5. **Запустите Telegram-бота:**
    ```bash
    npm run bot

6. **Запустите основной модуль мониторинга стрима:**
    ```bash
    npm start

## Лицензия

Распространяется под лицензией MIT. Подробнее см. в [LICENSE](LICENSE) .
