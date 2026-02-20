"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "../components/productCard";
import { fetchProducts, Product } from "../middleware/product";
import { supabase } from "../lib/supabaseClient";

export default function Marketplace() {
  const [posts, setPosts] = useState<Product[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchProducts();
      setPosts(data);
    };
    supabase.auth.getSession().then(({ data }) => {
      console.log("SESSION:", data.session);
    });
    loadPosts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-2">Marketplace</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse locally produced olive oils from independent growers. Support
          sustainability and taste the difference 🌿
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/product/${post.id}`}
            className="transition-transform hover:scale-[1.02]"
          >
            <ProductCard product={post} />
          </Link>
        ))}
      </div>
    </main>
  );
}
