"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

const API_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"
).replace(/\/$/, "");

interface User {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "USER";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch user info from token
  const fetchUser = async (authToken: string) => {
    try {
      // Decode JWT to get user info (simple decode, not verification)
      const payload = JSON.parse(atob(authToken.split(".")[1]));

      // In a real app, you'd fetch user details from API
      // For now, we'll use a mock approach
      // TODO: Add a /api/auth/me endpoint in backend

      // Mock user for now - in production, fetch from API
      setUser({
        id: payload.userId,
        email: "admin@example.com", // This should come from API
        name: "Admin",
        role: "ADMIN",
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      localStorage.removeItem("token");
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "login",
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const { token: authToken } = data;
      localStorage.setItem("token", authToken);
      setToken(authToken);
      await fetchUser(authToken);

      router.push("/admin");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      throw new Error(errorMessage);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "register",
          email,
          password,
          name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      const { token: authToken } = data;
      localStorage.setItem("token", authToken);
      setToken(authToken);
      await fetchUser(authToken);

      router.push("/admin");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  const isAdmin = user?.role === "ADMIN";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
