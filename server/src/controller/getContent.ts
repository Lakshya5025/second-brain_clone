import { Request, Response } from "express";
import { contentModel } from "../models/models.js";
import { MongooseError } from "mongoose";

export async function getContent(req: Request, res: Response) {
  try {
    //@ts-ignore
    const userId = req.user.userId;
    const contents = await contentModel.find({
      userId,
    });
    res.status(200).json({
      message: contents,
    });
  } catch (err) {
    if (err instanceof MongooseError)
      return res.status(500).json({
        message: err.message,
      });
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
}
