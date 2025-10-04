import { Request, Response } from "express";
import { contentModel } from "../models/models.js";

export async function updateContent(req: Request, res: Response) {
  const { id } = req.params;
  const { title, description } = req.body;
  //@ts-ignore
  const userId = req.user.userId;

  try {
    const content = await contentModel.findOneAndUpdate(
      { _id: id, userId },
      { title, description },
      { new: true }
    );
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
