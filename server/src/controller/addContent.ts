import type { NextFunction, Request, Response } from "express";
import { contentModel, tagModel } from "../models/models.js";
import { Error as MongooseError } from "mongoose";

export async function addContent(req: Request, res: Response) {
  const { title, link, type, description, tags } = req.body;
  //@ts-ignore
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: User ID is missing." });
  }

  if (!title || !link || !type || !description) {
    return res.status(400).json({
      error: "Title, link, and type are all required fields.",
    });
  }

  try {
    const tagIds = await Promise.all(
      (tags || []).map(async (tag: string) => {
        let tagDoc = await tagModel.findOne({ title: tag });
        if (!tagDoc) {
          tagDoc = new tagModel({ title: tag });
          await tagDoc.save();
        }
        return tagDoc._id;
      })
    );

    const newContent = new contentModel({
      title,
      link,
      type,
      userId,
      description,
      tags: tagIds,
    });

    const savedContent = await newContent.save();
    return res.status(201).json(savedContent);
  } catch (err) {
    if (err instanceof MongooseError.ValidationError) {
      return res.status(400).json({ error: err.message });
    }
    console.error("Error in addContent:", err);
    return res.status(500).json({
      error: "An unexpected server error occurred.",
    });
  }
}
