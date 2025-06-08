import connectDB from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

// GET one product by ID
export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  await connectDB();
  const product = await Product.findById(context.params.id);
  return NextResponse.json(product);
}

// UPDATE a product by ID
export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();
  const updated = await Product.findByIdAndUpdate(context.params.id, body, { new: true });
  return NextResponse.json(updated);
}

// DELETE a product by ID
export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  await connectDB();
  await Product.findByIdAndDelete(context.params.id);
  return NextResponse.json({ success: true });
}
