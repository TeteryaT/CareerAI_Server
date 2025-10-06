import express from "express";
import cors from "cors";
import { User } from "./models/userModel";
import { Speciality } from "./models/specialityModel";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API работает!!!!");
});

app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

export default app;
