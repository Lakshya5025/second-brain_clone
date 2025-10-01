import type { Request, Response } from "express";
import { userModel } from "../models/models.js";
import bcrypt from "bcrypt";
import { validUser } from "../validator/signup.js";
import { MongoServerError } from "mongodb";
import { z } from "zod";
export async function signup(req: Request, res: Response) {
  const salt = process.env.SALT;
  if (!salt) {
    console.error("SALT environment variable not set!");
    return res.status(500).json({ message: "Server configuration error." });
  }

  const saltRounds = parseInt(salt, 10);
  if (isNaN(saltRounds)) {
    console.error("SALT environment variable is not a valid number!");
    return res.status(500).json({ message: "Server configuration error." });
  }

  const validationResult = validUser.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      message: "Invalid input.",
      errors: z.treeifyError(validationResult.error),
    });
  }

  try {
    const { username, password, email } = validationResult.data;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new userModel({
      username,
      password: hashedPassword,
      email,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User created successfully.",
      user: {
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    if (err instanceof MongoServerError && err.code === 11000) {
      return res.status(409).json({
        message: "Username or email is already in use.",
      });
    }
    console.error("Error during user creation:", err);
    return res.status(500).json({
      message: "Failed to create user due to a server error.",
    });
  }
}
