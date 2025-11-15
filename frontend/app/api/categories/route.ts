import { NextResponse } from "next/server";

const mockCategories = [
  {
    id: "1",
    name: "Blangkon Jawa Tengah",
    slug: "blangkon-jawa-tengah",
    createdAt: new Date().toISOString(),
    _count: { products: 8 },
  },
  {
    id: "2",
    name: "Blangkon Yogyakarta",
    slug: "blangkon-yogyakarta",
    createdAt: new Date().toISOString(),
    _count: { products: 6 },
  },
  {
    id: "3",
    name: "Blangkon Solo",
    slug: "blangkon-solo",
    createdAt: new Date().toISOString(),
    _count: { products: 7 },
  },
  {
    id: "4",
    name: "Blangkon Batik",
    slug: "blangkon-batik",
    createdAt: new Date().toISOString(),
    _count: { products: 10 },
  },
  {
    id: "5",
    name: "Blangkon Polos",
    slug: "blangkon-polos",
    createdAt: new Date().toISOString(),
    _count: { products: 5 },
  },
  {
    id: "6",
    name: "Blangkon Premium",
    slug: "blangkon-premium",
    createdAt: new Date().toISOString(),
    _count: { products: 4 },
  },
];

export async function GET() {
  return NextResponse.json(mockCategories);
}
