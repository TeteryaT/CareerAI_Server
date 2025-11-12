import { Answer } from "../../models/answerModel";
import { Comment } from "../../models/commentModel";

export const answerService = {
  async createAnswer(commentId: number, text: string) {
    const comment = await Comment.findByPk(commentId);
    if (!comment) throw new Error("Комментарий не найден");

    const answer = await Answer.create({
      text,
      date: new Date(),
      commentId,
    });

    return answer;
  },

  async getAnswersByComment(commentId: number) {
    return await Answer.findAll({
      where: { commentId },
      order: [["date", "ASC"]],
    });
  },

  async getAllAnswers() {
    return await Answer.findAll({
      include: [{ model: Comment, as: "comment" }],
      order: [["date", "DESC"]],
    });
  },
};
