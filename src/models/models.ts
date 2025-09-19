import mongoose, { Schema, Types } from "mongoose";
const contentType = ["image", "article", "video", "audio"];

export const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const contentSchema = new mongoose.Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentType, required: true },
  title: { type: String, required: true },
  tags: [{ type: Types.ObjectId, ref: "Tag" }],
  userId: { type: Types.ObjectId, ref: "User", required: true },
});

export const tagSchema = new mongoose.Schema({
  title: { type: String, required: true },
});

export const linkSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  userId: { type: Types.ObjectId, required: true },
});
