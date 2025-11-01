import express from "express";
import cors from "cors";
import { User } from "./models/userModel";
import { Speciality } from "./models/specialityModel";
import authRoute from "./routes/auth/authRoute";
import userRoute from "./routes/user/userRoute";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API работает!!!!");
});
app.use("/auth", authRoute);
app.use("/users", userRoute);

export default app;
