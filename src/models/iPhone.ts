// src/models/iPhone.ts
import mongoose, { Schema, models } from "mongoose";

const iPhoneSchema = new Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});

export const iPhone = models.iPhone || mongoose.model("iPhone", iPhoneSchema);
