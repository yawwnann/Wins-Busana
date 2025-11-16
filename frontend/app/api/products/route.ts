import { NextResponse } from "next/server";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "https://wins-busana.vercel.app").replace(/\/$/, "");

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    // Buat URL dengan query parameter jika ada
    const apiUrl = categoryId 
      ? `${API_URL}/api/products?categoryId=${categoryId}`
      : `${API_URL}/api/products`;

    // Fetch products dari backend API
    const response = await fetch(apiUrl, {
      next: { revalidate: 60 }, // Cache selama 60 detik
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await response.json();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}
