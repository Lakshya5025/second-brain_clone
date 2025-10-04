import { Request, Response } from "express";
import { contentModel } from "../models/models.js";
import { MongooseError } from "mongoose";

export async function getContent(req: Request, res: Response) {
  try {
    //@ts-ignore
    const userId = req.user.userId;
    const { search, sortBy, sortOrder } = req.query;
    let query = { userId };
    if (search) {
      // @ts-ignore
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    let sort: any = {};
    if (sortBy) {
      sort[sortBy as string] = sortOrder === "desc" ? -1 : 1;
    } else {
      sort = { createdAt: -1 };
    }

    const contents = await contentModel.find(query).sort(sort).populate("tags");
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
