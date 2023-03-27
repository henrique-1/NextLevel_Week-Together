import { Request, Response } from "express";
import { createComplimentService } from "../services/createComplimentService";

export class createComplimentController {
  async handle(request: Request, response: Response) {
    const { tag_id, user_receiver, message } = request.body;
    const { userId } = request.params;
    const CreateComplimentService = new createComplimentService();

    const compliment = await CreateComplimentService.execute({ tag_id, user_sender: userId, user_receiver, message });

    return response.json(compliment);
  }
}
