import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/middleware";

// GET categories with product count
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
    });

    const result = await Promise.all(
      categories.map(async (cat) => {
        const productCount = await prisma.product.count({
          where: { categoryId: cat.id },
        });

        return {
          ...cat,
          _count: {
            products: productCount,
          },
        };
      }),
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching categories" },
      { status: 500 },
    );
  }
}

// POST
export async function POST(req: Request) {
  const auth = await requireAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 },
      );
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const category = await prisma.category.create({
      data: { name, slug },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating category" },
      { status: 500 },
    );
  }
}
