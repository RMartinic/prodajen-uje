"use client";

import Image from "next/image";
import { Product } from "../middleware/product";
const fallbackUrl = process.env.NEXT_PUBLIC_FALLBACK_URL || "";

type ProductCardProps = {
  product: Product;
  quantity?: number;
};

export default function ProductCard({ product, quantity }: ProductCardProps) {
  const title = product.title ?? "Product";
  const seller = product.sellerUsername ?? "Unknown seller";
  const createdAt = product.created_at
    ? new Date(product.created_at).toLocaleDateString()
    : "";

  const imageSrc = product.photo ?? fallbackUrl;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col h-full">
      <div className="relative w-full h-56">
        <Image
          src={imageSrc}
          alt={product.photo ? title : `${title} (placeholder image)`}
          fill
          className="object-cover"
          unoptimized={imageSrc.startsWith(
            "https://snkkcqsrmsumwgmapxnf.supabase.co/",
          )}
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-semibold text-green-800">{title}</h2>
          <div className="text-lg font-semibold text-gray-900">
            €{Number(product.price).toFixed(2)}
          </div>
        </div>

        <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-x-3 gap-y-1">
          {product.sort && (
            <span>
              • Type: <span className="font-medium">{product.sort}</span>
            </span>
          )}
          {product.location && (
            <span>
              • Location:{" "}
              <span className="font-medium">{product.location}</span>
            </span>
          )}
        </div>

        {product.description && (
          <p className="mt-3 text-gray-700 line-clamp-3">
            {product.description}
          </p>
        )}

        {quantity !== undefined && (
          <div className="mt-2 text-sm text-gray-700">
            Quantity: <span className="font-semibold">{quantity}</span>
          </div>
        )}

        <button className="mt-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          View Product
        </button>
      </div>
    </div>
  );
}
