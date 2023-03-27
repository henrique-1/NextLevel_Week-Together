import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: String;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  // Receber o token
  const authToken = request.headers.authorization;

  // Validar se o token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }

  // Validar se token é valido
  try {
    const { sub } = verify(authToken, "82ec88f89380f7a172a251f579a33c05") as IPayload;

    // Recuperar informações do usuário
    //request.userId = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
