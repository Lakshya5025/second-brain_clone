import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import { signup } from "./middleware/signup.js";
const app = express();
app.use(express.json());
app.post("/api/v1/signup", signup);

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
