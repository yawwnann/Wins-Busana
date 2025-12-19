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
