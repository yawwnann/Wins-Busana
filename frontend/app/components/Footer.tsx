
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";
export default function Footer() {
  const { theme } = useTheme();
  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative w-10 h-10">
                <Image
                    src={theme === "light" ? "/img/logo.png" : "/img/logo-dark.png"}
                    alt="Wins Busana Jawa Logo"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain transition-transform group-hover:scale-110"
                />
              </div>
              <span className="text-xl font-bold text-[#5BC0DE] dark:text-white">
                Wins Busana Jawa
              </span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">
              Melestarikan budaya Jawa melalui blangkon berkualitas tinggi
              dengan sentuhan tradisional dan modern.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">
              Akses Cepat
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-[#5BC0DE] dark:hover:text-[#5BC0DE] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-[#5BC0DE] dark:hover:text-[#5BC0DE] transition-colors"
                >
                  Catalog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">
              Kontak
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Email: winsbusanajawa@gmail.com
              <br />
              Telepon: 0859 2748 1160 / 0859 2748 1160
            </p>
          </div>
        </div>
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 text-center text-zinc-600 dark:text-zinc-400">
          <p>© 2025 Blangkon Store. Melestarikan Budaya Jawa.</p>
        </div>
      </div>
    </footer>
  );
}
