import type { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import { userModel } from "../models/models.js";
export async function auth(req: Request, res: Response, next: NextFunction) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error("JWT_SECRET environment variable not set!");
    return res.status(500).json({ message: "Server configuration error." });
  }
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "please login",
    });
  }
  try {
    const user = (await jwt.verify(token, jwtSecret)) as JwtPayload;
    const { userId } = user;
    try {
      const findInDB = await userModel.findOne({
        _id: userId,
      });
      if (findInDB) {
        //@ts-ignore
        req.user = { ...user };
        next();
      } else {
        res.json({ message: "unauthorized access" });
      }
    } catch (err) {
      res.json({
        message: "server error",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
}
