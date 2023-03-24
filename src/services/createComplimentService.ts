import mongoose from "mongoose";
import { Compliment } from "../models/Model";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

export class createComplimentService {
  async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
    // Conectar ao banco de dados MongoDB
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://127.0.0.1:27017/NLW-Together?replicaSet=rs");

    const compliment = new Compliment({
      tag_id: tag_id,
      user_sender: user_sender,
      user_receiver: user_receiver,
      message: message,
    });

    compliment.save((err) => {
      if (err) {
        console.error(err);
        mongoose.disconnect();
        return;
      }
      console.log("Compliment cadastrado com sucesso");
      mongoose.disconnect();
    });

    return JSON.stringify(`O compliment ${compliment} foi cadastrado com sucesso`);
  }
}
