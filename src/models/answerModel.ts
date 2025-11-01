import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface AnswerAttributes {
  id: number;
  text: string;
  date: Date;
}

export interface AnswerCreationAttributes
  extends Optional<AnswerAttributes, "id"> {}

export class Answer
  extends Model<AnswerAttributes, AnswerCreationAttributes>
  implements AnswerAttributes
{
  public id!: number;
  public text!: string;
  public date!: Date;
}

Answer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "answers",
  }
);
