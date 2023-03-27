import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { User } from "../models/Model";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const userId = request.params.userId;

  mongoose.set("strictQuery", false);
  await mongoose.connect("mongodb://127.0.0.1:27017/NLW-Together?replicaSet=rs");

  const admin = await User.findOne({
    _id: userId,
    admin: true,
  });

  await mongoose.disconnect();

  if (admin) {
    return next();
  }
  return response.status(401).json({
    error: "Unauthorized!",
  });
}
