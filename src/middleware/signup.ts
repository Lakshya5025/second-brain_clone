import type { Request, Response } from "express";
import { userModel } from "../models/models.js";
import bcrypt from "bcrypt";
import { validUser } from "../validator/signin.js";
import { MongoServerError } from "mongodb";

export async function signup(req: Request, res: Response) {
  const salt = process.env.SALT;
  if (!salt) {
    console.error("SALT environment variable not set!");
    return res.status(500).json({ message: "Server configuration error." });
  }
  const saltRounds = parseInt(salt, 10);
  const isValidUser = validUser.safeParse(req.body);
  if (isValidUser.success) {
    try {
      let { username, password, email } = req.body;
      const hashedPassword: string = await bcrypt.hash(password, saltRounds);
      const newUser = new userModel({
        username,
        password: hashedPassword,
        email,
      });
      await newUser.save();
      res.json({
        message: "success",
      });
    } catch (err) {
      if (err instanceof MongoServerError && err.code == 11000) {
        return res.json({
          message: "email already used",
        });
      }
      res.status(500).json({
        message: "failed to create user.",
      });
    }
  } else {
    const errorMessage = isValidUser.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(". ");

    return res.status(400).json({ message: `Invalid input. ${errorMessage}` });
  }
}
