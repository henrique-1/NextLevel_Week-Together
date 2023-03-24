import mongoose from "mongoose";
import { User } from "../models/Model";

interface IUserRequest {
  nome: string;
  email: string;
  admin?: boolean;
  senha: string;
}

export class createUserService {
  async execute({ nome, email, admin = false, senha }: IUserRequest) {
    // Conectar ao banco de dados MongoDB
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://127.0.0.1:27017/NLW-Together?replicaSet=rs");

    const user = new User({
      nome: nome,
      email: email,
      admin: admin,
      senha: senha,
    });

    user.save((err) => {
      if (err) {
        console.error(err);
        mongoose.disconnect();
        return;
      }
      console.log("Usuário cadastrado com sucesso");
      mongoose.disconnect();
    });

    return JSON.stringify(`O usuário ${user} foi cadastrado com sucesso`);
  }
}
