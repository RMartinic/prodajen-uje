"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { loadProduct, type Product } from "../../middleware/product";
import { useCart } from "@/app/providers/CartProvider";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const run = async () => {
      setLoading(true);
      try {
        const data = await loadProduct(id);
        if (isMounted) setProduct(data);
      } catch (err) {
        console.error(err);
        if (isMounted) setProduct(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    run();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <p className="p-8">Loading...</p>;
  if (!product) return <p className="p-8">Product not found</p>;

  const title = product.title ?? "Product";
  const seller = product.sellerUsername ?? "Unknown seller";

  const fallbackUrl = `https://snkkcqsrmsumwgmapxnf.supabase.co/storage/v1/object/public/product-images/no_picture.png`;
  const imageSrc = product.photo ?? fallbackUrl;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 max-w-4xl mx-auto">
      <button
        onClick={() => router.push("/marketplace")}
        className="text-green-700 hover:text-green-800 font-medium mb-8"
      >
        ← Back to Marketplace
      </button>

      <div className="relative w-[800px] h-[600px]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-3xl font-bold text-green-800">{title}</h1>
        <div className="text-2xl font-semibold text-gray-900">
          €{Number(product.price).toFixed(2)}
        </div>
      </div>

      <div className="text-sm text-gray-600 flex flex-wrap gap-3 mb-6">
        <span>
          Seller: <span className="font-medium">{seller}</span>
        </span>
        {product.sort && (
          <span>
            • Type: <span className="font-medium">{product.sort}</span>
          </span>
        )}
        {product.location && (
          <span>
            • Location: <span className="font-medium">{product.location}</span>
          </span>
        )}
        {product.created_at && (
          <span>
            • Posted:{" "}
            <span className="font-medium">
              {new Date(product.created_at).toLocaleDateString()}
            </span>
          </span>
        )}
      </div>

      {product.description ? (
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      ) : (
        <p className="text-gray-500 italic">No description provided.</p>
      )}
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQty((q) => Math.max(1, q - 1));
            }}
            className="border rounded-lg px-3 py-1 text-lg hover:bg-gray-300 transition"
          >
            −
          </button>

          <span className="min-w-8 text-center font-medium">{qty}</span>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQty((q) => q + 1);
            }}
            className="border rounded-lg px-3 py-1 text-lg hover:bg-gray-300 transition"
          >
            +
          </button>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            addToCart(
              {
                id: product.id,
                title: product.title ?? "Product",
                price: Number(product.price),
                photo: product.photo ?? null,
              },
              qty,
            );

            setQty(1);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition whitespace-nowrap"
        >
          Add to Cart
        </button>
      </div>
    </main>
  );
}
