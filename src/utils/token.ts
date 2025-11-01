import jwt from "jsonwebtoken";
const secret: string | undefined = process.env.JWT_SECRET;
export const generateAccessToken = (id: number) => {
  const payload = {
    id,
  };
  if (secret) {
    return jwt.sign(payload, secret, { expiresIn: "24h" });
  } else {
    throw new Error("Unable to generate token");
  }
};
