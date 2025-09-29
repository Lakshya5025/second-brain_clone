import type { Request, Response } from "express";
import { signinValidator } from "../validator/signin.js";
import { userModel } from "../models/models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export async function signin(req: Request, res: Response) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error("JWT_SECRET environment variable not set!");
    return res.status(500).json({ message: "Server configuration error." });
  }
  const isValidDetils = signinValidator.safeParse(req.body);
  if (isValidDetils.success) {
    const { username, password } = req.body;
    try {
      const user = await userModel.findOne({ username });
      if (!user)
        return res.json({
          message: "user not found",
        });

      const isValid: boolean = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.json({ message: "user not found" });
      }
      const payload = {
        userId: user._id,
        username: user.username,
        email: user.email,
      };

      const token = await jwt.sign(payload, jwtSecret);
      const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
      res
        .cookie("token", token, {
          maxAge: oneDayInMilliseconds,
          httpOnly: true,
          secure: true,
          path: "/",
        })
        .json({
          message: "login success",
        });
    } catch (err) {
      console.log(err);
      res.json({ message: "err" });
    }
  }
}
