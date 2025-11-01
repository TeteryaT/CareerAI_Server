import { User } from "../../models/userModel";

export class UserService {
  static async getNameAndSurname(user: User) {
    if (!user) {
      throw new Error("Пользователь не найден");
    }

    return {
      name: user.name,
      surname: user.surname,
    };
  }
}
