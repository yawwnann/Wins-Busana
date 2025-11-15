import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/middleware";
import { getCorsHeaders, handleCorsPreFlight } from "@/lib/cors";

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  return handleCorsPreFlight(origin);
}

// GET
export async function GET(request: Request) {
  const corsHeaders = getCorsHeaders(request);
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    const where = categoryId ? { categoryId } : {};

    // Ambil semua product
    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // Manual join untuk ambil category
    const result = await Promise.all(
      products.map(async (product) => {
        const category = product.categoryId
          ? await prisma.category.findUnique({
              where: { id: product.categoryId },
            })
          : null;

        return {
          ...product,
          category,
        };
      }),
    );

    return NextResponse.json(result, { headers: corsHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500, headers: corsHeaders },
    );
  }
}

// POST
export async function POST(req: Request) {
  const corsHeaders = getCorsHeaders(req);
  const auth = await requireAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ message: auth.error }, { status: auth.status, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { name, description, price, imageUrl, url, categoryId } = body;

    if (!name || !url) {
      return NextResponse.json(
        { message: "Name and URL are required" },
        { status: 400, headers: corsHeaders },
      );
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: price ? parseFloat(price) : null,
        imageUrl,
        url,
        categoryId: categoryId || null,
      },
    });

    return NextResponse.json(newProduct, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating product" },
      { status: 500, headers: corsHeaders },
    );
  }
}
