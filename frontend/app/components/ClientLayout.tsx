"use client";

import { ThemeProvider } from "../contexts/ThemeContext";
import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isLoginRoute = pathname === "/login";

  return (
    <ThemeProvider>
      <AuthProvider>
        {!isAdminRoute && !isLoginRoute && <Navbar />}
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
