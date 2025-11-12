import { User } from "./userModel";
import { Comment } from "./commentModel";
import { Answer } from "./answerModel";
import { History } from "./historyModel";
export function setupAssociations() {
  User.hasMany(Comment, {
    foreignKey: "userId",
    as: "comments",
  });
  Comment.hasOne(Answer, {
    foreignKey: "commentId",
    as: "answers",
  });
  History.belongsTo(User, { foreignKey: "user_id", as: "User" });
  User.hasMany(History, { foreignKey: "user_id", as: "history" });
}
