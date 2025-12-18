"use client";

import Image from "next/image";
import { getPicsumId } from "../utils/getPicsumId";

interface ProductCardProps {
  id: number;
  title: string;
  body: string;
}

export default function ProductCard({ id, title, body }: ProductCardProps) {
  const picsumId = getPicsumId(id);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      <Image
        src={`https://picsum.photos/id/${picsumId}/400/300`}
        alt={title || "Product image"}
        width={400}
        height={300}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-green-800">{title}</h2>
        <p className="mt-3 text-gray-700 line-clamp-3">{body}</p>
        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          View Product
        </button>
      </div>
    </div>
  );
}
