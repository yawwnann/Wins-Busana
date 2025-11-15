"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/app/components/AdminLayout";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { apiClient } from "@/lib/api-client";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: {
    products: number;
  };
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await apiClient.get("/api/categories");
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingCategory) {
        await apiClient.put(`/api/categories/${editingCategory.id}`, formData);
      } else {
        await apiClient.post("/api/categories", formData);
      }
      
      setShowModal(false);
      setFormData({ name: "" });
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      const err = error as Error;
      alert(err.message || "Gagal menyimpan kategori");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({ name: category.name });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus kategori ini?")) return;

    try {
      await apiClient.delete(`/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      const err = error as Error;
      alert(err.message || "Gagal menghapus kategori");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: "" });
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                Kelola Kategori
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                Tambah, edit, dan hapus kategori produk
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-[#5BC0DE] text-white rounded-lg hover:bg-[#46b0ce] transition-colors flex items-center space-x-2"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Tambah Kategori</span>
            </button>
          </div>

          {/* Categories Table */}
          <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5BC0DE] mx-auto"></div>
              </div>
            ) : categories.length === 0 ? (
              <div className="p-8 text-center text-zinc-500 dark:text-zinc-400">
                Belum ada kategori. Klik tombol &quot;Tambah Kategori&quot; untuk membuat kategori baru.
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-zinc-50 dark:bg-zinc-700/50 border-b border-zinc-200 dark:border-zinc-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Nama Kategori
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Jumlah Produk
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-700/30 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-zinc-900 dark:text-white">
                          {category.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                          {category.slug}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full">
                          {category._count?.products || 0} produk
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-[#5BC0DE] hover:text-[#46b0ce] mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-zinc-800 rounded-xl max-w-md w-full p-6">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
                {editingCategory ? "Edit Kategori" : "Tambah Kategori"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Nama Kategori
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ name: e.target.value })}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#5BC0DE] focus:border-transparent"
                    placeholder="Contoh: Blangkon Jogja"
                    required
                  />
                </div>
                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-2 bg-[#5BC0DE] text-white rounded-lg hover:bg-[#46b0ce] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Menyimpan..." : "Simpan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
}
