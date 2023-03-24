import { Request, Response } from "express";
import { createTagService } from "../services/createTagService";

export class createTagController {
  async handle(request: Request, response: Response) {
    const { nome } = request.body;

    const CreateTagService = new createTagService();

    const tag = await CreateTagService.execute({ nome });

    return response.json(tag);
  }
}
