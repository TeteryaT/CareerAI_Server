import dotenv from "dotenv";
import { sequelize } from "./config/db";
import app from "./app";
import "./models/userModel";
import "./models/specialityModel";

dotenv.config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Подключение к PostgreSQL установлено.");

    await sequelize.sync();
    console.log("Модели синхронизированы.");

    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Ошибка запуска сервера:", error);
  }
};

start();
