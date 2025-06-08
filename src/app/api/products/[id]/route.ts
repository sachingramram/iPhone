import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Product } from "@/models/Product";

type Params = {
  params: {
    id: string;
  };
};

// GET product by ID
export async function GET(request: NextRequest, context: Params) {
  await connectDB();
  const product = await Product.findById(context.params.id);
  return NextResponse.json(product);
}

// UPDATE product by ID
export async function PUT(request: NextRequest, context: Params) {
  await connectDB();
  const body = await request.json();
  const updatedProduct = await Product.findByIdAndUpdate(context.params.id, body, { new: true });
  return NextResponse.json(updatedProduct);
}

// DELETE product by ID
export async function DELETE(request: NextRequest, context: Params) {
  await connectDB();
  await Product.findByIdAndDelete(context.params.id);
  return NextResponse.json({ success: true });
}
