"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import Footer from "@/app/components/Footer";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          setError(true);
          return;
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#5BC0DE] border-t-transparent" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
            Blangkon tidak ditemukan
          </h1>
          <Link
            href="/catalog"
            className="text-[#5BC0DE] hover:underline font-medium"
          >
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 transition-colors">


      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-zinc-600 dark:text-zinc-400 hover:text-[#5BC0DE] transition-colors"
          >
            Home
          </Link>
          <span className="text-zinc-400">/</span>
          <Link
            href="/catalog"
            className="text-zinc-600 dark:text-zinc-400 hover:text-[#5BC0DE] transition-colors"
          >
            Katalog
          </Link>
          <span className="text-zinc-400">/</span>
          <span className="text-zinc-900 dark:text-white font-medium">
            {product.name}
          </span>
        </div>

        {/* Product Detail */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column: Image & Additional Info */}
          <div className="space-y-5">
            {/* Product Image */}
            <div className="bg-white dark:bg-zinc-800 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-700">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-700">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <svg
                      className="w-20 h-20 text-zinc-300 dark:text-zinc-600"
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
              </div>
            </div>

            {/* Additional Info - Below Image */}
            <div className="bg-linear-to-br from-[#5BC0DE]/5 to-[#5BC0DE]/10 dark:from-[#5BC0DE]/10 dark:to-[#5BC0DE]/5 p-6 rounded-2xl border border-[#5BC0DE]/20">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#5BC0DE]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Informasi Tambahan
              </h3>
              <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[#5BC0DE] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Blangkon handmade dengan kualitas terbaik</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[#5BC0DE] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Cocok untuk acara formal dan casual</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[#5BC0DE] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Garansi kepuasan pelanggan 100%</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[#5BC0DE] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Pengiriman ke seluruh Indonesia</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="space-y-5">
            {/* Title and Category */}
            <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-700">
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">
                {product.name}
              </h1>
              {product.category && (
                <Link
                  href={`/catalog?category=${product.categoryId}`}
                  className="inline-block text-sm px-3 py-1.5 bg-[#5BC0DE]/10 text-[#5BC0DE] rounded-lg font-medium hover:bg-[#5BC0DE]/20 transition-colors"
                >
                  {product.category.name}
                </Link>
              )}
              
              {/* Price */}
              {product.price !== null && (
                <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                  <p className="text-3xl font-bold text-[#5BC0DE]">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-700">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">
                  Deskripsi Produk
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Product Details */}
            <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-700">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                Detail Produk
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Kategori
                  </span>
                  <span className="font-medium text-zinc-900 dark:text-white">
                    {product.category?.name || "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Kode Produk
                  </span>
                  <span className="font-medium text-zinc-900 dark:text-white font-mono text-xs">
                    BLK-{product.id.slice(0, 12)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Status
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-green-600 dark:text-green-400">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Tersedia
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#5BC0DE] hover:bg-[#46b0ce] text-white py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Beli Sekarang</span>
              </a>

              <button
                onClick={() => router.back()}
                className="w-full bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white py-3.5 px-6 rounded-xl font-semibold transition-all border border-zinc-200 dark:border-zinc-700"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
