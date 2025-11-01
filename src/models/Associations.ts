import { User } from "./userModel";
import { Comment } from "./commentModel";

export function setupAssociations() {
  User.hasMany(Comment, {
    foreignKey: "userId",
    as: "comments",
  });
}
