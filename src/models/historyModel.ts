import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface HistoryAttributes {
  id: number;
  university: string;
  specialty: string;
  score: Number;
  ct_subject1: string;
  ct_subject2: string;
  ct_subject3: string;
  sum_points: Number;
  dormitory: string;
  education_form: string;
  payment_form: string;
  location: string;
  date: Date;
  user_id: Number;
}

interface HistoryCreationAttributes extends Optional<HistoryAttributes, "id"> {}

export class History
  extends Model<HistoryAttributes, HistoryCreationAttributes>
  implements HistoryAttributes
{
  public id!: number;
  public university!: string;
  public specialty!: string;
  public score!: number;
  public ct_subject1!: string;
  public ct_subject2!: string;
  public ct_subject3!: string;
  public sum_points!: number;
  public dormitory!: string;
  public education_form!: string;
  public payment_form!: string;
  public location!: string;
  public date!: Date;
  public user_id!: Number;
}

History.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    university: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ct_subject1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ct_subject2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ct_subject3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sum_points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dormitory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    education_form: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_form: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "history",
  }
);
