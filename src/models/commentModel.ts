import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface CommentAttributes {
  id: number;
  author: string;
  text: string;
  date: Date;
  rate: number;
}

export interface CommentCreationAttributes
  extends Optional<CommentAttributes, "id"> {}

export class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  public id!: number;
  public author!: string;
  public text!: string;
  public date!: Date;
  public rate!: number;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "comments",
  }
);
