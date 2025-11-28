import { Request, Response } from "express";
import { History } from "../../models/historyModel";
import { User } from "../../models/userModel";
interface PythonResponse {
  results: any[];
  ai: string;
}
interface RecommendationInput {
  subjects: string[];
  region: string;
  studyForm: string;
  paymentForm: string;
  score: number;
  dormitory: string;
}

import axios from "axios";

export const getRecommendations = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const user = req.user as any;
    if (!user) return res.status(401).json({ error: "Не авторизован" });

    console.log("Входные данные:", data);

    const pythonRes = await axios.post("http://127.0.0.1:5050/recommend", data);

    const { results, ai } = pythonRes.data as PythonResponse;
    console.log("Полученные данные:", results);
    console.log("Полученные данные ИИ:", ai);

    const cleanedResults = results.filter(
      (r) => r.university && r.specialty && r.score
    );

    for (const rec of cleanedResults) {
      await History.create({
        university: rec.university,
        specialty: rec.specialty,
        score: rec.score,

        ct_subject1: data.subjects[0] || "",
        ct_subject2: data.subjects[1] || "",
        ct_subject3: data.subjects[2] || "",

        sum_points: data.score,
        dormitory: data.dormitory,
        education_form: data.studyForm,
        payment_form: data.paymentForm,
        location: data.region,
        date: new Date(),
        user_id: user.id,
      });
    }

    return res.json({
      recommendations: results,
      ai,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
};

export const getUserHistory = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    if (!user) return res.status(401).json({ error: "Не авторизован" });

    const history = await History.findAll({ where: { user_id: user.id } });

    const historyWithUser = history.map((h) => ({
      id: h.id,
      university: h.university,
      specialty: h.specialty,
      score: h.score,
      ct_subject1: h.ct_subject1,
      ct_subject2: h.ct_subject2,
      ct_subject3: h.ct_subject3,
      sum_points: h.sum_points,
      dormitory: h.dormitory,
      education_form: h.education_form,
      payment_form: h.payment_form,
      location: h.location,
      date: h.date,
      user: {
        id: user.id,
        firstName: user.name,
        lastName: user.surname,
        email: user.email,
      },
    }));

    return res.json(historyWithUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
};

export const getAllHistory = async (_req: Request, res: Response) => {
  try {
    const history = await History.findAll({
      include: [
        {
          model: User,
          as: "User",
          attributes: ["id", "name", "surname", "email"],
        },
      ],
      order: [["date", "DESC"]],
    });

    const historyWithUsers = history.map((h: any) => ({
      id: h.id,
      university: h.university,
      specialty: h.specialty,
      score: h.score,
      ct_subject1: h.ct_subject1,
      ct_subject2: h.ct_subject2,
      ct_subject3: h.ct_subject3,
      sum_points: h.sum_points,
      dormitory: h.dormitory,
      education_form: h.education_form,
      payment_form: h.payment_form,
      location: h.location,
      date: h.date,
      user: {
        id: h.User?.id,
        firstName: h.User?.name,
        lastName: h.User?.surname,
        email: h.User?.email,
      },
    }));

    return res.json(historyWithUsers);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
};
