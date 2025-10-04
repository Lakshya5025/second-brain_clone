import { Request, Response } from "express";
import { userModel } from "../models/models.js";
import bcrypt from "bcrypt";

export async function updateUser(req: Request, res: Response) {
  //@ts-ignore
  const userId = req.user.userId;
  const { username, email } = req.body;
  const user = await userModel.findByIdAndUpdate(
    userId,
    { username, email },
    { new: true }
  );
  res.status(200).json(user);
}

export async function changePassword(req: Request, res: Response) {
  //@ts-ignore
  const userId = req.user.userId;
  const { oldPassword, newPassword } = req.body;
  const user = await userModel.findById(userId);
  if (user && (await bcrypt.compare(oldPassword, user.password))) {
    const salt = process.env.SALT || "10";
    user.password = await bcrypt.hash(newPassword, parseInt(salt));
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
}
