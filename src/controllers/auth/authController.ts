import { Request, Response, NextFunction } from "express";
import { authService } from "../../services/auth/authService";
export class authController {
  static registrateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, surname, phone, email, password } = req.body;

      const { user, token } = await authService.registrateUser(
        name,
        surname,
        phone,
        email,
        password
      );

      res.status(201).json({ token, user });
    } catch (error) {
      next(error);
    }
  };

  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.login(email, password);
      res.json({ token, user });
    } catch (error) {
      next(error);
    }
  };
}
