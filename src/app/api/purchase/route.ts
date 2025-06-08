import connectMongoDB from "@/lib/mongodb";
import Purchase from "@/models/Purchase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { productId, productName } = await req.json();

    // Yahan connectMongoDB ko await karo
    await connectMongoDB();

    const newPurchase = await Purchase.create({
      userEmail: session.user?.email,
      userName: session.user?.name,
      productId,
      productName,
      // purchaseDate: new Date(),
    });

    return NextResponse.json(newPurchase, { status: 201 });
  } catch (error) {
    console.error("Purchase POST error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectMongoDB();

 const purchases = await Purchase.find({ userEmail: session.user?.email }).sort({ createdAt: -1 });
    return NextResponse.json(purchases, { status: 200 });
  } catch (error) {
    console.error("Purchase GET error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing purchase ID" }, { status: 400 });
    }

    await connectMongoDB();

    // Ensure the purchase belongs to this user
    const purchase = await Purchase.findOne({ _id: id, userEmail: session.user?.email });
    if (!purchase) {
      return NextResponse.json({ error: "Purchase not found or unauthorized" }, { status: 404 });
    }

    await Purchase.deleteOne({ _id: id });

    return NextResponse.json({ message: "Purchase deleted" }, { status: 200 });
  } catch (error) {
    console.error("Purchase DELETE error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
