import { User } from "./userModel";
import { Comment } from "./commentModel";
import { Answer } from "./answerModel";

export function setupAssociations() {
  User.hasMany(Comment, {
    foreignKey: "userId",
    as: "comments",
  });
  Comment.hasOne(Answer, {
    foreignKey: "userId",
    as: "comments",
  });
}
