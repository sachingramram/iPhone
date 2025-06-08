import  connectMongoDB  from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const products = await Product.find();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  await connectMongoDB;
  const body = await req.json();
  const newProduct = await Product.create(body);
  return NextResponse.json(newProduct);
}
