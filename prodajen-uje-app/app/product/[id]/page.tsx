"use client";
import { useParams,useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { products } from "../../data/products";
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const router = useRouter();

  const [saved, setSaved] = useState(false);
  const [inCart, setInCart] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
        Product not found.
      </main>
    );
  }

  return (
    
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => router.push("/marketplace")}
          className="flex items-center gap-2 text-green-700 hover:text-green-800 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Marketplace
        </button>

        <div className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 relative">
            <Image
              src={product.image}
              alt={product.location}
              width={600}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">{product.location}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-2xl font-semibold text-green-700 mb-6">
                {product.price.toFixed(2)}€
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setInCart(true)}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-white transition-colors ${
                  inCart ? "bg-green-800" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {inCart ? "Added to Cart" : "Add to Cart"}
              </button>

              <button
                onClick={() => setSaved(!saved)}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg border font-medium transition-colors ${
                  saved
                    ? "bg-green-100 border-green-600 text-green-700"
                    : "border-gray-300 text-gray-700 hover:border-green-600 hover:text-green-700"
                }`}
              >
                <Heart className={`w-5 h-5 ${saved ? "fill-green-600" : ""}`} />
                {saved ? "Saved" : "Save for Later"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}