import jwt from "jsonwebtoken";

export const generateAccessToken = (id: number) => {
  const secret = process.env.JWT_SECRET;
  const payload = {
    id,
  };
  if (secret) {
    return jwt.sign(payload, secret, { expiresIn: "24h" });
  } else {
    throw new Error("Unable to generate token");
  }
};
