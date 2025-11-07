import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-bold text-green-800 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl text-gray-700 mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Oops! The page you’re looking for doesn’t exist.  
        Maybe go back to the marketplace and discover our olive oils.
      </p>
      <Link
        href="/marketplace"
        className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
      >
        Back to Marketplace
      </Link>
    </main>
  );
}