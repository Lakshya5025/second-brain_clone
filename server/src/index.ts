import * as dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import { signup } from "./controller/signup.js";
import type { Request, Response } from "express";
import { signin } from "./controller/signin.js";
import { auth } from "./middleware/auth.js";
import { addContent } from "./controller/addContent.js";
import { getSharedContent } from "./controller/getSharedContent.js";
import { deleteContent } from "./controller/deleteContent.js";
import { shareLink } from "./controller/createLink.js";
import { getContent } from "./controller/getContent.js";
const app = express();
app.use(express.json());
app.use(cookieParser());

// --- Routes ---
app.post("/api/v1/signup", signup);
app.post("/api/v1/signin", signin);
app.post("/api/v1/content", auth, addContent);
app.get("/api/v1/content", auth, getContent);
app.delete("/api/v1/content/:id", auth, deleteContent);
app.post("/api/v1/brain/share/:id", auth, shareLink);
app.get("/api/v1/brain/:shareLink", getSharedContent);

async function startServer() {
  if (!process.env.MONGO_URL || !process.env.PORT || !process.env.SERVER_URL) {
    console.error(
      "Missing required environment variables. Make sure .env file is present and correct."
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected successfully");

    app.listen(process.env.PORT, () => {
      console.log(
        `Server is listening on ${process.env.SERVER_URL}${process.env.PORT}`
      );
    });
  } catch (err) {
    console.error("Failed to connect to the database:");
    console.error(err);
    process.exit(1);
  }
}

startServer();
