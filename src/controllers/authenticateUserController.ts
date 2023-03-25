import { Request, Response } from "express";
import { authenticateUserService } from "../services/authenticateUserService";

export class authenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, senha } = request.body;

    const AuthenticateUserService = new authenticateUserService();

    const token = await AuthenticateUserService.execute({
      email,
      senha,
    });

    return response.json(token);
  }
}
