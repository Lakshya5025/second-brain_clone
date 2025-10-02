import { Request, Response } from "express";

export function logout(req: Request, res: Response) {
  return res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logout successful." });
}
