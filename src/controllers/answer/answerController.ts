import { Request, Response } from "express";
import { answerService } from "../../services/answer/answerService";

export const answerController = {
  async create(req: Request, res: Response) {
    try {
      const { commentId, text } = req.body;

      if (!commentId || !text) {
        return res
          .status(400)
          .json({ message: "Необходимо указать commentId и текст" });
      }

      const answer = await answerService.createAnswer(commentId, text);
      res.status(201).json(answer);
    } catch (error: any) {
      console.error("Ошибка при создании ответа:", error);
      res.status(500).json({ message: error.message || "Ошибка сервера" });
    }
  },

  async getByComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const answers = await answerService.getAnswersByComment(
        Number(commentId)
      );
      res.json(answers);
    } catch (error: any) {
      console.error("Ошибка при получении ответов:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const answers = await answerService.getAllAnswers();
      res.json(answers);
    } catch (error: any) {
      console.error("Ошибка при получении всех ответов:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },
};
