import { NextResponse } from "next/server";

const API_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "https://wins-busana.vercel.app").replace(/\/$/, "");

export async function GET() {
  try {
    // Fetch categories dari backend API
    const response = await fetch(`${API_URL}/api/categories`, {
      next: { revalidate: 60 }, // Cache selama 60 detik
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const categories = await response.json();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { message: "Error fetching categories" },
      { status: 500 }
    );
  }
}
