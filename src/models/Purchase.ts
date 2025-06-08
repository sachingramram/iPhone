import mongoose, { Schema } from "mongoose";

const purchaseSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    userName: { type: String },
    productName: { type: String, required: true },
    productId: { type: String, required: true },
   
  },
  { timestamps: true }
);

const Purchase =
  mongoose.models.Purchase || mongoose.model("Purchase", purchaseSchema);

export default Purchase;
