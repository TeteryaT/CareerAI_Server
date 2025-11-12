import { Request, Response } from "express";
import { commentService } from "../../services/comment/commentService";
import { User } from "../../models/userModel";
import { Comment } from "../../models/commentModel";
import { Answer } from "../../models/answerModel";

export const commentController = {
  async getAll(req: Request, res: Response) {
    try {
      const comments = await Comment.findAll({
        include: [{ model: Answer, as: "answers" }],
        order: [["date", "DESC"]],
      });
      res.json(comments);
    } catch (error: any) {
      console.error("Ошибка при получении комментариев:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const user = req.user as User;

      if (!user) {
        return res.status(401).json({ message: "Не авторизован" });
      }

      const author = `${user.name} ${user.surname}`;
      const { text, rating } = req.body;

      if (!text || rating === undefined) {
        return res.status(400).json({ message: "Необходимо указать все поля" });
      }

      const comment = await commentService.createComment(author, text, rating);
      res.status(201).json(comment);
    } catch (error: any) {
      console.error("Ошибка при создании комментария:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },
};
