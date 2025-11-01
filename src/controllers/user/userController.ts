import { Request, Response } from "express";
import { UserService } from "../../services/user/userService";

export class UserController {
  static async getNameAndSurname(req: Request, res: Response) {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ message: "Не авторизован" });
      }

      const result = await UserService.getNameAndSurname(user as any);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
