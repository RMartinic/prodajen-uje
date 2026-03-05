import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <Link
            href="/"
            className="text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium"
          >
            ← Go Home
          </Link>

          <Link
            href="/marketplace"
            className="text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium"
          >
            Back to Marketplace →
          </Link>
        </div>

        <div className="flex flex-col items-center text-center">
          <img
            src="/404-page-not-found.png"
            alt="404 page not found"
            className="max-w-md w-full mb-6"
          />

          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md">
            Looks like this page doesn’t exist. The olive grove you’re looking
            for might be somewhere else.
          </p>
        </div>
      </div>
    </main>
  );
}
