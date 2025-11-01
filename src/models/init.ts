import { sequelize } from "../config/db";
import { User } from "./userModel";
import { Comment } from "./commentModel";
import { Speciality } from "./specialityModel";
import { Answer } from "./answerModel";
import { setupAssociations } from "./Associations";

export async function initializeModels(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    setupAssociations();

    await sequelize.sync({ force: false });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Failed to initialize models:", error);
    process.exit(1);
  }
}

export { sequelize, User, Comment, Speciality, Answer };
