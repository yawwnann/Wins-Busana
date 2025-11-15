"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/app/components/AdminLayout";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { apiClient } from "@/lib/api-client";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  imageUrl: string | null;
  url: string;
  categoryId: string | null;
  category?: Category;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    url: "",
    categoryId: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        apiClient.get<Product[]>("/api/products"),
        apiClient.get<Category[]>("/api/categories"),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Upload file jika ada file baru yang dipilih
      let imageUrl = formData.imageUrl;
      if (selectedFile) {
        const result = await apiClient.upload("/api/upload", selectedFile);
        imageUrl = result.url;
      }

      const data = {
        ...formData,
        imageUrl,
        price: formData.price ? parseFloat(formData.price) : null,
        categoryId: formData.categoryId || null,
      };

      if (editingProduct) {
        await apiClient.put(`/api/products/${editingProduct.id}`, data);
      } else {
        await apiClient.post("/api/products", data);
      }

      setShowModal(false);
      resetForm();
      fetchData();
    } catch (error) {
      const err = error as Error;
      alert(err.message || "Gagal menyimpan produk");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price?.toString() || "",
      imageUrl: product.imageUrl || "",
      url: product.url,
      categoryId: product.categoryId || "",
    });
    setPreviewUrl(product.imageUrl || "");
    setSelectedFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;

    try {
      await apiClient.delete(`/api/products/${id}`);
      fetchData();
    } catch (error) {
      const err = error as Error;
      alert(err.message || "Gagal menghapus produk");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      url: "",
      categoryId: "",
    });
    setEditingProduct(null);
    setSelectedFile(null);
    setPreviewUrl("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const formatPrice = (price: number | null) => {
    if (!price) return "-";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                Kelola Produk
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                Tambah, edit, dan hapus produk blangkon
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
              <span>Tambah Produk</span>
            </button>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5BC0DE] mx-auto"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-8 text-center text-zinc-500 dark:text-zinc-400">
              Belum ada produk. Klik tombol &quot;Tambah Produk&quot; untuk membuat produk baru.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Product Image */}
                  <div className="aspect-square bg-zinc-100 dark:bg-zinc-700 relative">
                    {product.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-400">
                        <svg
                          className="w-12 h-12"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-3 space-y-2">
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white text-sm line-clamp-1">
                        {product.name}
                      </h3>
                      {product.category && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-[#5BC0DE]/10 text-[#5BC0DE] rounded">
                          {product.category.name}
                        </span>
                      )}
                    </div>

                    {product.description && (
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    <div className="pt-1 border-t border-zinc-200 dark:border-zinc-700">
                      <span className="text-sm font-bold text-[#5BC0DE]">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-1.5 pt-1">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 px-2 py-1.5 bg-[#5BC0DE] text-white rounded hover:bg-[#46b0ce] transition-colors text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex-1 px-2 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white dark:bg-zinc-800 rounded-xl max-w-2xl w-full p-6 my-8">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
                {editingProduct ? "Edit Produk" : "Tambah Produk"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Nama Produk *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#5BC0DE] focus:border-transparent"
                    placeholder="Contoh: Blangkon Jogja Premium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#5BC0DE] focus:border-transparent"
                    placeholder="Deskripsi produk..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Harga
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#5BC0DE] focus:border-transparent"
                      placeholder="100000"
                      step="1000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Kategori
                    </label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) =>
                        setFormData({ ...formData, categoryId: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#5BC0DE] focus:border-transparent"
                    >
                      <option value="">Tanpa Kategori</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Gambar Produk
                  </label>
                  
                  {/* Preview Image */}
                  {previewUrl && (
                    <div className="mb-3 relative w-full h-48 bg-zinc-100 dark:bg-zinc-700 rounded-lg overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* File Input */}
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#5BC0DE] focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#5BC0DE] file:text-white hover:file:bg-[#46b0ce]"
                      />
                    </div>
                  </div>
                  
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                    Upload gambar produk (JPG, PNG, max 5MB)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    URL Produk (Link Pembelian) *
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) =>
                      setFormData({ ...formData, url: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#5BC0DE] focus:border-transparent"
                    placeholder="https://tokopedia.com/..."
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
