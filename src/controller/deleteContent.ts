import { Request, Response } from "express";
import { contentModel } from "../models/models.js";
import { MongooseError } from "mongoose";

export async function deleteContent(req: Request, res: Response) {
  const id = req.params.id;
  //@ts-ignore
  const userId = req.user.userId;
  if (!id) {
    return res.status(400).json({
      message: "Error deleting",
    });
  }
  try {
    const result = await contentModel.deleteOne({ _id: id, userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        message:
          "Content not found or you do not have permission to delete it.",
      });
    }

    res.status(200).json({ message: "Content deleted successfully." });
  } catch (error) {
    console.error("Error deleting content:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
}
