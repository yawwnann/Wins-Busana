"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import { apiClient } from "@/lib/api-client";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    loading: true,
  });

  const fetchStats = async () => {
    try {
      const [products, categories] = await Promise.all([
        apiClient.get("/api/products"),
        apiClient.get("/api/categories"),
      ]);

      setStats({
        totalProducts: products.length,
        totalCategories: categories.length,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      setStats((prev) => ({ ...prev, loading: false }));
    }
  };

    useEffect(() => {
    // Fetch stats on component mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchStats();
  }, []);

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-1">
              Selamat datang di Admin Panel Wins Busana Jawa
            </p>
          </div>

          {/* Stats Cards */}
          {stats.loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700 animate-pulse"
                >
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-20 mb-4" />
                  <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-16" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Products */}
              <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                      Total Produk
                    </p>
                    <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                      {stats.totalProducts}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Total Categories */}
              <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                      Total Kategori
                    </p>
                    <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                      {stats.totalCategories}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600 dark:text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Quick Action */}
              <div className="bg-linear-to-br from-[#5BC0DE] to-[#46b0ce] rounded-xl p-6 text-white hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/80 mb-1">Status Sistem</p>
                    <p className="text-2xl font-bold">Online</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
              Aksi Cepat
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/admin/products"
                className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-700/50 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#5BC0DE] rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-white">
                      Tambah Produk
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Tambah produk baru ke katalog
                    </p>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-zinc-400 group-hover:text-[#5BC0DE] transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>

              <a
                href="/admin/categories"
                className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-700/50 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#5BC0DE] rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-white">
                      Kelola Kategori
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Atur kategori produk
                    </p>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-zinc-400 group-hover:text-[#5BC0DE] transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Welcome Card */}
          <div className="bg-linear-to-r from-[#5BC0DE]/10 to-[#46b0ce]/10 dark:from-[#5BC0DE]/20 dark:to-[#46b0ce]/20 rounded-xl p-6 border border-[#5BC0DE]/20">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#5BC0DE] rounded-lg flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">
                  Selamat Datang di Admin Panel!
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Gunakan menu di sidebar untuk mengelola produk blangkon, kategori, dan
                  konten website. Pastikan untuk selalu memeriksa data sebelum melakukan
                  perubahan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
