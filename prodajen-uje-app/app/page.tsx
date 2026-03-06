"use client";

import Image from "next/image";
import ProductCard from "./components/productCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchProducts, Product } from "./middleware/product";

export default function Home() {
  const [posts, setPosts] = useState<Product[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchProducts();
      setPosts(data.slice(0, 3));
    };
    loadPosts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative w-full h-[60vh]">
        <Image
          src="/homepagePicture.jpg"
          alt="Olive Grove"
          fill
          priority
          className="object-cover brightness-90"
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Pure. Honest. Decentralized.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Olive oil the way nature intended — directly from local producers to
            your table.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-gray-50"></div>
      </section>

      <section className="max-w-6xl mx-auto px-4 -mt-36 relative z-10">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
      </section>

      <div className="h-20" />
    </main>
  );
}
