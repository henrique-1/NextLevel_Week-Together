import mongoose, { Document, Schema } from "mongoose";
const bcrypt = require("bcrypt");

// User Schema
export interface IUser extends Document {
  nome: string;
  email: string;
  admin: boolean;
  senha: string;
  created_at: Date;
  updated_at: Date;
}

const userSchema: Schema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  admin: { type: Boolean, required: true, default: false },
  senha: { type: String, required: true, select: false },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
});

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("senha")) {
    return next();
  }

  const hashedPassword = await bcrypt.hash(this.senha, 10);
  this.senha = hashedPassword;

  next();
});

export const User = mongoose.model<IUser>("User", userSchema);

// Tag Schema
export interface ITag extends Document {
  nome: string;
  created_at: Date;
  updated_at: Date;
}

const tagSchema: Schema = new mongoose.Schema({
  nome: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
});

export const Tag = mongoose.model<ITag>("Tag", tagSchema);

// Compliment Schema
export interface ICompliment extends Document {
  user_sender: mongoose.Types.ObjectId;
  user_receiver: mongoose.Types.ObjectId;
  tag_id: mongoose.Types.ObjectId;
  message: string;
  created_at: Date;
}

const complimentSchema: Schema = new mongoose.Schema({
  user_sender: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  user_receiver: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  tag_id: { type: mongoose.Types.ObjectId, ref: "Tag", required: true },
  message: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now },
});

export const Compliment = mongoose.model<ICompliment>("Compliment", complimentSchema);
