import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface SpecialityAttributes {
  id: number;
  speciality_name: string;
  university_name: string;
  certificate_points: Number;
  ct_subject1: string;
  ct_subject2: string;
  ct_subject3: string;
  sum_points: Number;
  dormitory: string;
  education_form: string;
  payment_form: string;
  location: string;
}

interface SpecialityCreationAttributes
  extends Optional<SpecialityAttributes, "id"> {}

export class Speciality
  extends Model<SpecialityAttributes, SpecialityCreationAttributes>
  implements SpecialityAttributes
{
  public id!: number;
  public speciality_name!: string;
  public university_name!: string;
  public certificate_points!: number;
  public ct_subject1!: string;
  public ct_subject2!: string;
  public ct_subject3!: string;
  public sum_points!: number;
  public dormitory!: string;
  public education_form!: string;
  public payment_form!: string;
  public location!: string;
}

Speciality.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    speciality_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    university_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    certificate_points: {
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
  },
  {
    sequelize,
    tableName: "specialities",
  }
);
