import { Request, Response, NextFunction } from "express";
import Joi from "joi";
export const validatePassword = (
  password: string
): { isValid: boolean; error?: string } => {
  if (password.length < 8) {
    return {
      isValid: false,
      error: `Invalid password: ${password}. At least 8 symbols required.`,
    };
  }
  if (!/\d/.test(password)) {
    return {
      isValid: false,
      error: `Invalid password: ${password}. At least 1 digit required.`,
    };
  }
  if (password.toLowerCase() === password) {
    return {
      isValid: false,
      error: `Invalid password: ${password}. At least 1 capital letter required.`,
    };
  }
  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      error: `Invalid password: ${password}. At least 1 lowercase letter required.`,
    };
  }
  return { isValid: true };
};
const schema = Joi.object({
  name: Joi.string().alphanum().required(),
  surname: Joi.string().alphanum().required(),
  phone: Joi.string()
    .pattern(new RegExp("^\\+375(17|25|29|33|44)\\d{7}$"))
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ru"] },
    })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,20}$")).required(),
});
export const validateRegistration = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    res.status(400).json({
      message: "Validation error",
      errors: errorMessages,
    });
  } else {
    const passwordValidation = validatePassword(req.body.password);
    if (!passwordValidation.isValid) {
      res.status(400).json({
        message: "Validation error",
        errors: [passwordValidation.error],
      });
    } else {
      next();
    }
  }
};
