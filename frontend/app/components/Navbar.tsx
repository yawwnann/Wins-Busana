"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";
import { useState } from "react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo - Left */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src={theme === "light" ? "/img/logo.png" : "/img/logo-dark.png"}
                alt="Wins Busana Jawa Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain transition-transform group-hover:scale-110"
              />
              <span className="text-xl font-bold text-[#5BC0DE] dark:text-white">
                Wins Busana Jawa
              </span>
            </Link>
          </div>

          {/* Menu - Center */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            <Link
              href="/"
              className="text-zinc-600 dark:text-zinc-300 hover:text-[#5BC0DE] dark:hover:text-[#5BC0DE] transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/catalog"
              className="text-zinc-600 dark:text-zinc-300 hover:text-[#5BC0DE] dark:hover:text-[#5BC0DE] transition-colors font-medium"
            >
              Catalog
            </Link>
          </div>

          {/* Actions - Right */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg
                  className="w-5 h-5 text-zinc-800 dark:text-zinc-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fadeIn">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Catalog
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
