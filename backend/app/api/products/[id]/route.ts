import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/middleware";

type Params = Promise<{ id: string }>;

// GET single product
export async function GET(
  request: Request,
  { params }: { params: Params },
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching product" },
      { status: 500 },
    );
  }
}

// PUT (update) product
export async function PUT(
  request: Request,
  { params }: { params: Params },
) {
  const auth = await requireAdmin(request);
  if ("error" in auth) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { name, description, price, imageUrl, url, categoryId } = body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: price ? parseFloat(price) : null,
        imageUrl,
        url,
        categoryId: categoryId || null,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating product" },
      { status: 500 },
    );
  }
}

// DELETE product
export async function DELETE(
  request: Request,
  { params }: { params: Params },
) {
  const auth = await requireAdmin(request);
  if ("error" in auth) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  try {
    const { id } = await params;

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting product" },
      { status: 500 },
    );
  }
}
