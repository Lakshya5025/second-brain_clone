import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {
  userModel,
  contentModel,
  linkModel,
  tagModel,
} from "./models/models.js";
const salt = process.env.SALT;
if (!salt) process.exit(1);
const saltRounds = parseInt(salt, 10);
const app = express();
app.use(express.json());
app.post("/api/v1/signup", async (req, res) => {
  console.log(req.body);
  try {
    let { username, password, email } = req.body;
    password = await bcrypt.hash(password, saltRounds);
    const newUser = new userModel({
      username,
      password,
      email,
    });
    await newUser.save();
    res.json({
      message: "success",
    });
  } catch (err) {
    // THIS IS THE MOST IMPORTANT STEP
    console.error("SIGNUP FAILED:", err);

    // You can then send a generic error to the client
    res.status(500).json({
      message: "Failed to create user.",
    });
  }
});

app.post("/api/v1/signin", (req, res) => {});

app.post("/api/v1/content", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

async function main() {
  await mongoose.connect(`${process.env.MONGO_URL}`);
  console.log("DB conneccted");
}

main();

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err.message);
  else console.log(`http://localhost:${process.env.PORT}`);
});
