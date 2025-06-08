import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { Product } from "@/models/Product";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await connectMongoDB();
  const product = await Product.findById(params.id);
  return NextResponse.json(product);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await connectMongoDB();
  const body = await request.json();
  const updated = await Product.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await connectMongoDB();
  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
