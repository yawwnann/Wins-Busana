import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/middleware";

type Params = { id: string };

// GET single category with products
export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const { id } = params;

    // Ambil kategori dulu
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 },
      );
    }

    // Manual join products
    const products = await prisma.product.findMany({
      where: { categoryId: category.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      ...category,
      products,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching category" },
      { status: 500 },
    );
  }
}

// UPDATE category
export async function PUT(request: Request, { params }: { params: Params }) {
  const auth = await requireAdmin(request);
  if ("error" in auth) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  try {
    const { id } = params;
    const body = await request.json();
    const { name } = body;

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const category = await prisma.category.update({
      where: { id },
      data: { name, slug },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating category" },
      { status: 500 },
    );
  }
}

// DELETE category
export async function DELETE(request: Request, { params }: { params: Params }) {
  const auth = await requireAdmin(request);
  if ("error" in auth) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  try {
    const { id } = params;

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting category" },
      { status: 500 },
    );
  }
}
