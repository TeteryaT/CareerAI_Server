import express from "express";
import cors from "cors";
import authRoute from "./routes/auth/authRoute";
import userRoute from "./routes/user/userRoute";
import commentRoute from "./routes/comment/commentRoute";
import answerRoute from "./routes/answer/answerRoute";
import resultRoute from "./routes/result/resultRoute";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API работает!!!!");
});
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/comments", commentRoute);
app.use("/answers", answerRoute);
app.use("/result", resultRoute);
export default app;
