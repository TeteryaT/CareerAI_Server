import { sequelize } from "../config/db";
import { User } from "./userModel";
import { Comment } from "./commentModel";
import { Speciality } from "./specialityModel";
import { Answer } from "./answerModel";
import { setupAssociations } from "./Associations";
import { History } from "./historyModel";
import bcrypt from "bcrypt";

export async function initializeModels(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    setupAssociations();

    await sequelize.sync({ force: false });
    console.log("All models were synchronized successfully.");

    const existingAdmin = await User.findOne({
      where: { email: "careerai@yandex.ru" },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin", 10);

      await User.create({
        name: "Application",
        surname: "Admin",
        phone: "nophone",
        email: "careerai@yandex.ru",
        password: hashedPassword,
        role: "admin",
      });

      console.log("Admin user created successfully.");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    console.error("Failed to initialize models:", error);
    process.exit(1);
  }
}

export { sequelize, User, Comment, Speciality, Answer, History };
