import { Request, Response, NextFunction } from "express";
import { User } from "../models/Model";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const userId = request.params.userId;

  const admin = await User.findOne({
    _id: userId,
  });

  if (admin) {
    return next();
  }

  return response.status(401).json({
    error: "Unauthorized!",
  });
}
