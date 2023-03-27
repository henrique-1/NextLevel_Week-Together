import { Request, Response } from "express";
import { listTagService } from "../services/listTagServices";

export class listTagController {
  async handle(request: Request, response: Response) {
    const ListTagService = new listTagService();

    const tags = await ListTagService.execute();

    return response.json(tags);
  }
}
