"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getPicsumId } from "../../utils/getPicsumId";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-8">Loading...</p>;
  if (!post) return <p className="p-8">Product not found</p>;

  const picsumId = getPicsumId(Number(id));

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 max-w-4xl mx-auto">
      <button
        onClick={() => router.push("/marketplace")}
        className="text-green-700 hover:text-green-800 font-medium mb-8"
      >
        ← Back to Marketplace
      </button>

      <Image
        src={`https://picsum.photos/id/${picsumId}/600/400`}
        alt={post.title || "Product image"}
        width={600}
        height={400}
        className="rounded-xl mb-6 object-cover w-full"
      />

      <h1 className="text-3xl font-bold text-green-800 mb-4">{post.title}</h1>
      <p className="text-gray-700">{post.body}</p>
    </main>
  );
}
