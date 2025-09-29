import { Request, Response } from "express";
import { linkModel } from "../models/models.js";

export async function getSharedContent(req: Request, res: Response) {
  try {
    const hash = req.params.shareLink;
    const content = await linkModel.findOne({ hash }).populate("contentId");
    if (!content) {
      return res.status(404).json({
        message: "Invalid url",
      });
    }
    res.status(200).json({
      message: content,
    });
  } catch (err) {
    console.log("Error: " + err);
    res.status(500).json({
      message: "Server Error",
    });
  }
}
