import { NextResponse } from "next/server";

const mockProducts = [
  {
    id: "1",
    name: "Blangkon Batik Parang",
    description: "Blangkon batik dengan motif parang barong, cocok untuk acara formal dan pernikahan adat Jawa",
    price: 250000,
    imageUrl: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=500",
    url: "/catalog/1",
    categoryId: "4",
    createdAt: new Date().toISOString(),
    category: {
      id: "4",
      name: "Blangkon Batik",
      slug: "blangkon-batik",
      createdAt: new Date().toISOString(),
    },
  },
  {
    id: "2",
    name: "Blangkon Solo Klasik",
    description: "Blangkon khas Solo dengan bentuk tradisional, terbuat dari kain berkualitas tinggi",
    price: 180000,
    imageUrl: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=500",
    url: "/catalog/2",
    categoryId: "3",
    createdAt: new Date().toISOString(),
    category: {
      id: "3",
      name: "Blangkon Solo",
      slug: "blangkon-solo",
      createdAt: new Date().toISOString(),
    },
  },
  {
    id: "3",
    name: "Blangkon Yogyakarta Premium",
    description: "Blangkon Yogyakarta dengan detail sempurna, cocok untuk pengantin pria",
    price: 320000,
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500",
    url: "/catalog/3",
    categoryId: "2",
    createdAt: new Date().toISOString(),
    category: {
      id: "2",
      name: "Blangkon Yogyakarta",
      slug: "blangkon-yogyakarta",
      createdAt: new Date().toISOString(),
    },
  },
  {
    id: "4",
    name: "Blangkon Polos Hitam",
    description: "Blangkon polos warna hitam, simple dan elegan untuk berbagai acara",
    price: 120000,
    imageUrl: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=500",
    url: "/catalog/4",
    categoryId: "5",
    createdAt: new Date().toISOString(),
    category: {
      id: "5",
      name: "Blangkon Polos",
      slug: "blangkon-polos",
      createdAt: new Date().toISOString(),
    },
  },
  {
    id: "5",
    name: "Blangkon Jawa Tengah Tradisional",
    description: "Blangkon Jawa Tengah dengan ciri khas bentuk kerucut dan lipatan rapi",
    price: 200000,
    imageUrl: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=500",
    url: "/catalog/5",
    categoryId: "1",
    createdAt: new Date().toISOString(),
    category: {
      id: "1",
      name: "Blangkon Jawa Tengah",
      slug: "blangkon-jawa-tengah",
      createdAt: new Date().toISOString(),
    },
  },
  {
    id: "6",
    name: "Blangkon Batik Kawung",
    description: "Blangkon dengan motif batik kawung yang anggun dan penuh makna filosofis",
    price: 280000,
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
    url: "/catalog/6",
    categoryId: "4",
    createdAt: new Date().toISOString(),
    category: {
      id: "4",
      name: "Blangkon Batik",
      slug: "blangkon-batik",
      createdAt: new Date().toISOString(),
    },
  },
  {
    id: "7",
    name: "Blangkon Premium Sutra",
    description: "Blangkon premium berbahan sutra halus, khusus untuk acara istimewa",
    price: 450000,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
    url: "/catalog/7",
    categoryId: "6",
    createdAt: new Date().toISOString(),
    category: {
      id: "6",
      name: "Blangkon Premium",
      slug: "blangkon-premium",
      createdAt: new Date().toISOString(),
    },
  },
  {
    id: "8",
    name: "Blangkon Solo Batik Truntum",
    description: "Perpaduan gaya Solo dengan motif batik truntum yang melambangkan cinta kasih",
    price: 265000,
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500",
    url: "/catalog/8",
    categoryId: "3",
    createdAt: new Date().toISOString(),
    category: {
      id: "3",
      name: "Blangkon Solo",
      slug: "blangkon-solo",
      createdAt: new Date().toISOString(),
    },
  },
  {
    id: "9",
    name: "Blangkon Polos Coklat",
    description: "Blangkon polos warna coklat, cocok untuk pemakaian sehari-hari",
    price: 135000,
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500",
    url: "/catalog/9",
    categoryId: "5",
    createdAt: new Date().toISOString(),
    category: {
      id: "5",
      name: "Blangkon Polos",
      slug: "blangkon-polos",
      createdAt: new Date().toISOString(),
    },
  },
  {
    id: "10",
    name: "Blangkon Yogyakarta Modern",
    description: "Blangkon Yogyakarta dengan sentuhan modern, nyaman dipakai dan stylish",
    price: 220000,
    imageUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=500",
    url: "/catalog/10",
    categoryId: "2",
    createdAt: new Date().toISOString(),
    category: {
      id: "2",
      name: "Blangkon Yogyakarta",
      slug: "blangkon-yogyakarta",
      createdAt: new Date().toISOString(),
    },
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");

  if (categoryId) {
    const filtered = mockProducts.filter((p) => p.categoryId === categoryId);
    return NextResponse.json(filtered);
  }

  return NextResponse.json(mockProducts);
}
