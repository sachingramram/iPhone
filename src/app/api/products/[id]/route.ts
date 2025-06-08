import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { Product } from "@/models/Product";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(
  _req: NextRequest,
  context: any
) {
  await connectMongoDB();
  const product = await Product.findById(context.params.id);
  return NextResponse.json(product);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(
  req: NextRequest,
  context: any
) {
  await connectMongoDB();
  const body = await req.json();
  const updated = await Product.findByIdAndUpdate(context.params.id, body, {
    new: true,
  });
  return NextResponse.json(updated);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(
  _req: NextRequest,
  context: any
) {
  await connectMongoDB();
  await Product.findByIdAndDelete(context.params.id);
  return NextResponse.json({ success: true });
}
