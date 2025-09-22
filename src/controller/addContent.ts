import type { NextFunction, Request, Response } from "express";

export async function addContent(req: Request, res: Response) {
  res.status(501).json({ message: "Not Implemented" });
}
