import { Request, Response } from "express";
import { createUserService } from "./../services/createUserService";

export class createUserController {
  async handle(request: Request, response: Response) {
    const { nome, email, admin, senha } = request.body;

    const CreateUserService = new createUserService();

    const user = await CreateUserService.execute({ nome, email, admin, senha });

    return response.json(user);
  }
}
