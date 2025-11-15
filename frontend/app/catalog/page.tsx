"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { productsAPI, categoriesAPI } from "@/lib/api";
import { Product, Category } from "@/lib/types";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";


export default function CatalogPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryId
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesData = await categoriesAPI.getAll();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const productsData = await productsAPI.getAll(
          selectedCategory || undefined
        );
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
  }, [categoryId]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 transition-colors">
      <div className="relative overflow-hidden py-16">
        {/* Background Banner Image */}
        <div className="absolute inset-0">
          <Image
            src="/img/blangkon.jpg"
            alt="Blangkon Banner"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Katalog Blangkon
          </h1>
          <p className="text-lg text-white/90 drop-shadow-md">
            Telusuri koleksi blangkon berkualitas tinggi kami
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Cari blangkon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#5BC0DE] transition-colors"
            />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 text-center">
            Jenis <span className="text-[#5BC0DE]">Blangkon</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-center mb-8">
            Pilih blangkon sesuai dengan kebutuhan dan selera Anda
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {categories.map((category) => {
              const productCount = products.filter(
                (p) => p.categoryId === category.id
              ).length;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group relative bg-white dark:bg-zinc-800 rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    selectedCategory === category.id
                      ? "border-[#5BC0DE] shadow-lg shadow-[#5BC0DE]/20"
                      : "border-zinc-200 dark:border-zinc-700 hover:border-[#5BC0DE]/50"
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold transition-colors ${
                        selectedCategory === category.id
                          ? "bg-[#5BC0DE] text-white"
                          : "bg-[#5BC0DE]/10 text-[#5BC0DE] group-hover:bg-[#5BC0DE]/20"
                      }`}
                    >
                      {category.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3
                        className={`font-semibold transition-colors ${
                          selectedCategory === category.id
                            ? "text-[#5BC0DE]"
                            : "text-zinc-900 dark:text-white group-hover:text-[#5BC0DE]"
                        }`}
                      >
                        {category.name}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        {productCount} {productCount === 1 ? "product" : "products"}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#5BC0DE] border-t-transparent" />
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="mb-6">
              <p className="text-zinc-600 dark:text-zinc-400">
                Menampilkan {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "blangkon" : "blangkon"}
                {selectedCategory && (
                  <>
                    {" "}
                    di kategori{" "}
                    {
                      categories.find((c) => c.id === selectedCategory)
                        ?.name
                    }
                  </>
                )}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-slideUp"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <svg
              className="w-16 h-16 mx-auto text-zinc-300 dark:text-zinc-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-2">
              Blangkon tidak ditemukan
            </p>
            <p className="text-zinc-500 dark:text-zinc-500">
              {searchQuery
                ? "Coba kata kunci pencarian lain"
                : "Belum ada blangkon tersedia di kategori ini"}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
