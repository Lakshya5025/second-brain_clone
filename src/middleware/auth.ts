import type { NextFunction, Request, Response } from "express";

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  console.log(token);
  next();
}
