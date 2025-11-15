"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white dark:bg-zinc-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-zinc-200 dark:border-zinc-700">
      {product.imageUrl ? (
        <div className="relative h-56 w-full bg-zinc-100 dark:bg-zinc-700 overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.category && (
            <div className="absolute top-3 left-3">
              <span className="inline-block text-xs px-3 py-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm text-zinc-800 dark:text-zinc-200 rounded-full font-medium border border-zinc-200 dark:border-zinc-700">
                {product.category.name}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="h-56 w-full bg-[#5BC0DE]/10 dark:bg-[#5BC0DE]/20 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-zinc-300 dark:text-zinc-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      <div className="p-5">
        <h3 className="font-semibold text-lg text-zinc-900 dark:text-white mb-2 line-clamp-1 group-hover:text-[#5BC0DE] dark:group-hover:text-[#5BC0DE] transition-colors">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        {product.price !== null && (
          <div className="mb-4">
            <p className="text-2xl font-bold text-[#5BC0DE] dark:text-[#5BC0DE]">
              Rp {product.price.toLocaleString("id-ID")}
            </p>
          </div>
        )}

        <Link
          href={`/catalog/${product.id}`}
          className="flex items-center justify-center w-full bg-[#5BC0DE] hover:bg-[#46b0ce] dark:bg-[#5BC0DE] dark:hover:bg-[#46b0ce] text-white py-2.5 px-4 rounded-lg transition-all duration-300 font-medium group-hover:shadow-lg"
        >
          <span>Lihat Detail</span>
          <svg
            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
