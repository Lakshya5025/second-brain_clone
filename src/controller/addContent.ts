import type { NextFunction, Request, Response } from "express";
import { contentModel } from "../models/models.js";
import { Error as MongooseError } from "mongoose";

export async function addContent(req: Request, res: Response) {
  const { title, link, type } = req.body;
  //@ts-ignore
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: User ID is missing." });
  }

  if (!title || !link || !type) {
    return res.status(400).json({
      error: "Title, link, and type are all required fields.",
    });
  }

  try {
    console.log(title, link, type, userId);
    const newContent = new contentModel({
      title,
      link,
      type,
      userId,
    });

    const savedContent = await newContent.save();
    return res.status(201).json(savedContent);
  } catch (err) {
    if (err instanceof MongooseError.ValidationError) {
      return res.status(400).json({ error: err.message });
    }
    if (err instanceof Error)
      console.error("Error in addContent:", err.message);
    return res.status(500).json({
      error: "An unexpected server error occurred.",
    });
  }
}
