import { NextResponse } from "next/server";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "https://wins-busana.vercel.app").replace(/\/$/, "");

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Fetch product dari backend API
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      next: { revalidate: 60 }, // Cache selama 60 detik
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const product = await response.json();
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "Error fetching product" },
      { status: 500 }
    );
  }
}
