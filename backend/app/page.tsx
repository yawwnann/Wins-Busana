import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
      <main className="flex flex-col items-center justify-center gap-6 p-8 text-center">
        <h1 className="text-4xl font-bold text-black dark:text-white">
          Wins Busana API
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Backend API is running successfully
        </p>
        <div className="mt-4 rounded-lg bg-green-100 px-6 py-3 text-green-800 dark:bg-green-900 dark:text-green-200">
          ✓ API Status: Online
        </div>
        <div className="mt-8 space-y-2 text-sm text-gray-500">
          <p>Available endpoints:</p>
          <ul className="space-y-1">
            <li>POST /api/auth - Authentication</li>
            <li>GET /api/products - Products list</li>
            <li>GET /api/categories - Categories list</li>
            <li>POST /api/upload - File upload</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
