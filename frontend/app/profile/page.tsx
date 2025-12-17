"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 transition-colors">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20 lg:py-32">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/img/profile.jpg"
            alt="Profile Background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Tentang Kami
            </h1>
            <p className="text-xl md:text-2xl text-white/90 drop-shadow-md max-w-3xl mx-auto">
              Melestarikan Budaya Jawa Melalui Kerajinan Blangkon
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Profile Image & Introduction */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative">
              <div className="absolute -inset-4 bg-linear-to-r from-amber-400 to-amber-600 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/img/profile.jpg"
                  alt="Profile UMKM Blangkon"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-[#5BC0DE]/10 text-[#5BC0DE] dark:bg-[#5BC0DE]/20 px-4 py-2 rounded-full text-sm font-semibold">
                  Sejak 1997
                </span>
              </div>
              <h2 className="text-4xl font-bold text-zinc-900 dark:text-white">
                Perjalanan Melestarikan Budaya
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Lebih dari dua dekade dedikasi dalam menghadirkan blangkon
                berkualitas tinggi, menjaga warisan budaya Jawa tetap hidup di
                era modern.
              </p>
            </div>
          </div>

          {/* Timeline Story */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-center text-zinc-900 dark:text-white mb-12">
              Perjalanan Kami
            </h3>

            {/* 1997 */}
            <div className="relative pl-8 md:pl-12 border-l-4 border-[#5BC0DE]">
              <div className="absolute -left-3 top-0 w-6 h-6 bg-[#5BC0DE] rounded-full border-4 border-white dark:border-zinc-900 shadow-lg"></div>
              <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-[#5BC0DE]">
                    1997
                  </span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                    Awal Perjalanan
                  </span>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg">
                  Awal mula usaha blangkon ini dimulai pada tahun 1997, ketika
                  suami saya ikut bekerja dengan orang lain dalam pembuatan
                  blangkon. Sejak saat itu hingga sekarang, perjalanan usaha ini
                  tidaklah mudah. Pada awalnya, kami bekerja sama dengan kios
                  blangkon yang ada di Pasar Beringharjo, di mana pihak tersebut
                  menyediakan kain dan kami bertugas membuat blangkon sesuai
                  pesanan.
                </p>
              </div>
            </div>

            {/* 2010 */}
            <div className="relative pl-8 md:pl-12 border-l-4 border-[#5BC0DE]">
              <div className="absolute -left-3 top-0 w-6 h-6 bg-[#5BC0DE] rounded-full border-4 border-white dark:border-zinc-900 shadow-lg"></div>
              <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-[#5BC0DE]">
                    2010
                  </span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                    Berdiri Resmi
                  </span>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg">
                  UMKM Blangkon resmi berdiri pada tahun 2010. Kami aktif
                  mengikuti berbagai pelatihan UMKM yang diadakan oleh
                  pemerintah maupun pihak terkait. Selain itu, kami juga telah
                  mengurus Nomor Induk Berusaha (NIB) serta pendaftaran merek
                  usaha.
                </p>
              </div>
            </div>

            {/* 2016 */}
            <div className="relative pl-8 md:pl-12 border-l-4 border-[#5BC0DE]">
              <div className="absolute -left-3 top-0 w-6 h-6 bg-[#5BC0DE] rounded-full border-4 border-white dark:border-zinc-900 shadow-lg"></div>
              <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-[#5BC0DE]">
                    2016
                  </span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                    Era Digital
                  </span>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg">
                  Seiring waktu, kami mulai menjual blangkon secara mandiri,
                  baik secara online maupun offline, sejak tahun 2016 hingga
                  sekarang. Langkah ini membuka peluang baru untuk menjangkau
                  pelanggan yang lebih luas di seluruh Indonesia.
                </p>
              </div>
            </div>

            {/* Present */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-3 top-0 w-6 h-6 bg-[#5BC0DE] rounded-full border-4 border-white dark:border-zinc-900 shadow-lg animate-pulse"></div>
              <div className="bg-[#5BC0DE]/5 dark:bg-[#5BC0DE]/10 rounded-xl shadow-lg p-8 border-2 border-[#5BC0DE]/20 dark:border-[#5BC0DE]/30 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-[#5BC0DE]">
                    Sekarang
                  </span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                    Melestarikan Budaya
                  </span>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg">
                  Usaha blangkon ini bukan merupakan tradisi turun-temurun
                  keluarga. Namun, blangkon sebagai aksesori adat Jawa memiliki
                  nilai budaya yang tinggi. Melalui usaha ini, kami tidak hanya
                  berwirausaha, tetapi juga turut melestarikan budaya Jawa.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#5BC0DE]/10 dark:bg-[#5BC0DE]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[#5BC0DE]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                Kualitas Terjamin
              </h4>
              <p className="text-zinc-600 dark:text-zinc-300">
                Setiap blangkon dibuat dengan teliti dan menggunakan bahan
                berkualitas tinggi
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#5BC0DE]/10 dark:bg-[#5BC0DE]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[#5BC0DE]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                Pelestarian Budaya
              </h4>
              <p className="text-zinc-600 dark:text-zinc-300">
                Berkomitmen menjaga dan melestarikan warisan budaya Jawa untuk
                generasi mendatang
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#5BC0DE]/10 dark:bg-[#5BC0DE]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[#5BC0DE]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                Pengalaman 25+ Tahun
              </h4>
              <p className="text-zinc-600 dark:text-zinc-300">
                Lebih dari dua dekade pengalaman dalam pembuatan blangkon
                tradisional
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-20 bg-[#5BC0DE] dark:bg-[#4A9BB5] rounded-2xl shadow-2xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">
              Tertarik dengan Produk Kami?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Jelajahi koleksi blangkon kami dan jadilah bagian dari pelestarian
              budaya Jawa
            </p>
            <Link
              href="/catalog"
              className="inline-block bg-white text-[#5BC0DE] px-8 py-4 rounded-full font-semibold text-lg hover:bg-zinc-100 dark:hover:bg-zinc-200 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Lihat Katalog Produk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
