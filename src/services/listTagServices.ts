import mongoose from "mongoose";
import { Tag } from "../models/Model";

export class listTagService {
  async execute() {
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://127.0.0.1:27017/NLW-Together?replicaSet=rs");

    const tags = await Tag.find({});

    mongoose.disconnect();

    return tags;
  }
}
