import { Comment } from "../../models/commentModel";

export const commentService = {
  async getAllComments() {
    return await Comment.findAll({
      order: [["date", "DESC"]],
    });
  },

  async createComment(author: string, text: string, rate: number) {
    return await Comment.create({
      author,
      text,
      rate,
      date: new Date(),
    });
  },
};
