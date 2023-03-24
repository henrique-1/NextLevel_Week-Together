import mongoose from "mongoose";
import { Tag } from "../models/Model";

interface ITagRequest {
  nome: String;
}

export class createTagService {
  async execute({ nome }: ITagRequest) {
    // Conectar ao banco de dados MongoDB
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://127.0.0.1:27017/NLW-Together?replicaSet=rs");

    const tag = new Tag({
      nome: nome,
    });

    tag.save((err) => {
      if (err) {
        console.error(err);
        mongoose.disconnect();
        return JSON.stringify(`Ocorreu um erro ao cadastrar a tag ${tag.nome}`);
      }
      console.log("Tag cadastrada com sucesso");
      mongoose.disconnect();
    });

    return JSON.stringify(`A tag ${tag.nome} foi cadastrada com sucesso`);
  }
}
