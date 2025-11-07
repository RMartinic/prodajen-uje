import Link from "next/link";
import { products } from "../data/products";
import ProductCard from "../components/productCard";

export default function Marketplace() {
   return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-2">Marketplace</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse locally produced olive oils from independent growers.  
          Support sustainability and taste the difference 🌿
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="transition-transform hover:scale-[1.02]"
            >
            <ProductCard {...product} />
            </Link>
        ))}
      </div>
    </main>
  );
}