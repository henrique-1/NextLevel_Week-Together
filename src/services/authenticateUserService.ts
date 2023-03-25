import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../models/Model";

interface IAuthenticateRequest {
  email: string;
  senha: string;
}

export class authenticateUserService {
  async execute({ email, senha }: IAuthenticateRequest) {
    // Conectar ao banco de dados MongoDB
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://127.0.0.1:27017/NLW-Together?replicaSet=rs");

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    const passwordMatch = await compare(senha, user.senha);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    const token = sign(
      {
        email: user.email,
      },
      "82ec88f89380f7a172a251f579a33c05",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}
