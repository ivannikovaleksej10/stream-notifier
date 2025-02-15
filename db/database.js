const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'users.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Ошибка при открытии базы данных SQLite:", err.message);
  } else {
    console.log("Соединение с SQLite установлено.");
  }
});

// Создаем таблицу, если она не существует
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      chat_id INTEGER PRIMARY KEY
    )
  `);
});

module.exports = db;
