import bcrypt from "bcryptjs";
import { generateAccessToken } from "../../utils/token";
import { User, UserCreationAttributes } from "../../models/userModel";

const saltRounds: number = Number(process.env.SALT || 10);

export class authService {
  static async registrateUser(
    name: string,
    surname: string,
    phone: string,
    email: string,
    password: string
  ) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      surname,
      phone,
      email,
      password: hashPassword,
      role: "client",
    } as UserCreationAttributes);

    const token = generateAccessToken(user.id);

    return { user, token };
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error(`No users ${email} found`);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Incorrect password");
    }

    const token = generateAccessToken(user.id);

    return { user, token };
  }
}
