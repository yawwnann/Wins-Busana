const API_URL = (process.env.NEXT_PUBLIC_API_URL || "https://wins-busana.vercel.app/").replace(/\/$/, "");

interface FetchOptions extends RequestInit {
  token?: string;
}

interface ProductInput {
  name: string;
  description?: string | null;
  price?: number | null;
  imageUrl?: string | null;
  url: string;
  categoryId?: string | null;
}

export async function apiRequest(
  endpoint: string,
  options: FetchOptions = {}
) {
  const { token, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }

  return response.json();
}

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    apiRequest("/api/auth", {
      method: "POST",
      body: JSON.stringify({ email, password, type: "login" }),
    }),
  register: (email: string, password: string, name: string) =>
    apiRequest("/api/auth", {
      method: "POST",
      body: JSON.stringify({ email, password, name, type: "register" }),
    }),
};

// Categories API
export const categoriesAPI = {
  getAll: () => apiRequest("/api/categories"),
  create: (name: string, token: string) =>
    apiRequest("/api/categories", {
      method: "POST",
      body: JSON.stringify({ name }),
      token,
    }),
  update: (id: string, name: string, token: string) =>
    apiRequest(`/api/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name }),
      token,
    }),
  delete: (id: string, token: string) =>
    apiRequest(`/api/categories/${id}`, {
      method: "DELETE",
      token,
    }),
};

// Products API
export const productsAPI = {
  getAll: (categoryId?: string) => {
    const query = categoryId ? `?categoryId=${categoryId}` : "";
    return apiRequest(`/api/products${query}`);
  },
  create: (data: ProductInput, token: string) =>
    apiRequest("/api/products", {
      method: "POST",
      body: JSON.stringify(data),
      token,
    }),
  update: (id: string, data: Partial<ProductInput>, token: string) =>
    apiRequest(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      token,
    }),
  delete: (id: string, token: string) =>
    apiRequest(`/api/products/${id}`, {
      method: "DELETE",
      token,
    }),
};
