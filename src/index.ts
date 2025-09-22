import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import { signup } from "./controller/signup.js";
import type { Request, Response } from "express";
import { signin } from "./controller/signin.js";
import { auth } from "./middleware/auth.js";
import { addContent } from "./controller/addContent.js";
const app = express();
app.use(express.json());

// --- Routes ---
app.post("/api/v1/signup", signup);
app.post("/api/v1/signin", signin);
app.post("/api/v1/content", auth, addContent);
app.get("/api/v1/content", (req: Request, res: Response) => {
  res.status(501).json({ message: "Not Implemented" });
});
app.delete("/api/v1/content", (req: Request, res: Response) => {
  res.status(501).json({ message: "Not Implemented" });
});
app.post("/api/v1/brain/share", (req: Request, res: Response) => {
  res.status(501).json({ message: "Not Implemented" });
});
app.get("/api/v1/brain/:shareLink", (req: Request, res: Response) => {
  res.status(501).json({ message: "Not Implemented" });
});

async function startServer() {
  if (!process.env.MONGO_URL || !process.env.PORT) {
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
        `Server is listening on http://localhost:${process.env.PORT}`
      );
    });
  } catch (err) {
    console.error("Failed to connect to the database:");
    console.error(err);
    process.exit(1);
  }
}

startServer();
