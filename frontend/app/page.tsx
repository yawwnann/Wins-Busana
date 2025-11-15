"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { productsAPI, categoriesAPI } from "@/lib/api";
import { Product, Category } from "@/lib/types";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";

const bannerImages = [
  "/img/belangkon1.jpg",
  "/img/blangkon.jpg",
  "/img/blangkon2.jpeg",
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          productsAPI.getAll(),
          categoriesAPI.getAll(),
        ]);
        setProducts(productsData.slice(0, 6));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % bannerImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 transition-colors">

      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background Image Slider */}
        <div className="absolute inset-0">
          {bannerImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image}
                alt={`Blangkon ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          {/* Dark Overlay for text contrast */}
          <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentImageIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center animate-slideUp">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
              Blangkon Tradisional
              <br />
              Khas Jawa
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Blangkon berkualitas tinggi dengan desain tradisional dan modern.
              <br />
              Lestarikan budaya Jawa dengan koleksi blangkon pilihan kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/catalog"
                className="group px-8 py-4 bg-[#5BC0DE] hover:bg-[#46b0ce] dark:bg-[#5BC0DE] dark:hover:bg-[#46b0ce] text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <span>Lihat Koleksi Blangkon</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <a
                href="#categories"
                className="px-8 py-4 bg-white dark:bg-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-600 text-zinc-900 dark:text-white rounded-xl font-semibold transition-all duration-300 shadow border border-zinc-200 dark:border-zinc-600"
              >
                Jenis-jenis Blangkon
              </a>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Koleksi Blangkon", value: "100+" },
              { label: "Jenis Blangkon", value: "6+" },
              { label: "Pelanggan Puas", value: "2K+" },
              { label: "Tahun Pengalaman", value: "15+" },
            ].map((stat, index) => (
              <div
                key={index}
                className="animate-scaleIn backdrop-blur-sm bg-white/10 dark:bg-black/20 p-6 rounded-xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
                  {stat.value}
                </div>
                <div className="text-white/90 drop-shadow-md">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section id="categories" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              Jenis <span className="text-[#5BC0DE] dark:text-[#5BC0DE]">Blangkon</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">
              Pilih blangkon sesuai dengan kebutuhan dan selera Anda
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#7AA7BD] border-t-transparent" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <Link
                  key={category.id}
                  href={`/catalog?category=${category.id}`}
                  className="group p-8 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center border border-zinc-200 dark:border-zinc-700 hover:border-[#5BC0DE] dark:hover:border-[#5BC0DE] animate-scaleIn"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-[#5BC0DE] dark:bg-[#5BC0DE] rounded-2xl flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                    {category.name.charAt(0)}
                  </div>
                  <h3 className="font-semibold text-lg text-zinc-900 dark:text-white mb-2 group-hover:text-[#5BC0DE] dark:group-hover:text-[#5BC0DE] transition-colors">
                    {category.name}
                  </h3>
                  {category._count && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {category._count.products} products
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
                Koleksi <span className="text-[#5BC0DE] dark:text-[#5BC0DE]">Blangkon</span>
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Blangkon pilihan terbaik untuk Anda
              </p>
            </div>
            <Link
              href="/catalog"
              className="group hidden md:flex items-center gap-2 text-[#5BC0DE] dark:text-[#5BC0DE] hover:gap-3 transition-all font-semibold"
            >
              <span>View All</span>
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#7AA7BD] border-t-transparent" />
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-slideUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-zinc-600 dark:text-zinc-400">
              <p className="text-xl">Belum ada koleksi blangkon tersedia</p>
            </div>
          )}

          <div className="text-center mt-12 md:hidden">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#5BC0DE] hover:bg-[#46b0ce] dark:bg-[#5BC0DE] dark:hover:bg-[#46b0ce] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <span>Lihat Semua Blangkon</span>
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />

    </div>
  );
}
