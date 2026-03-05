"use client";

import { useCart } from "@/app/providers/CartProvider";
import ProductCard from "@/app/components/productCard";
import type { Product } from "../middleware/product";
import { createOrdersFromCart } from "../middleware/order";
import { useEffect, useState } from "react";
import { getMyUserId } from "../middleware/profile";
import toast from "react-hot-toast";
import Link from "next/link";

export default function CartPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { items, increase, decrease, removeFromCart, clear, totalPrice } =
    useCart();

  useEffect(() => {
    const run = async () => {
      const userId = await getMyUserId();
      if (userId) {
        setIsLoggedIn(true);
        return;
      }
    };
    run();
  });

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Cart</h1>

        {items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {items.map((i) => {
              const productForCard: Product = {
                id: i.id,
                owner_id: "",
                title: i.title,
                description: null,
                price: i.price,
                photo: i.photo,
                sort: null,
                location: "",
                created_at: new Date().toISOString(),
                sellerUsername: " ",
              };

              return (
                <div key={i.id} className="space-y-3">
                  <Link
                    key={productForCard.id}
                    href={`/product/${productForCard.id}`}
                    className="transition-transform hover:scale-[1.02]"
                  >
                    <ProductCard
                      product={productForCard}
                      quantity={i.quantity}
                    />
                  </Link>
                  <div className="bg-white mt-6 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex items-center gap-3">
                    <button
                      className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1
               text-gray-900 dark:text-gray-100
               hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                      onClick={() => decrease(i.id)}
                    >
                      −
                    </button>

                    <span className="min-w-8 text-center font-medium text-gray-900 dark:text-gray-100">
                      {i.quantity}
                    </span>

                    <button
                      className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1
               text-gray-900 dark:text-gray-100
               hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                      onClick={() => increase(i.id)}
                    >
                      +
                    </button>

                    <div className="ml-auto font-semibold text-gray-900 dark:text-gray-100">
                      €{(i.price * i.quantity).toFixed(2)}
                    </div>

                    <button
                      className="ml-4 text-red-600 dark:text-red-400 hover:underline"
                      onClick={() => removeFromCart(i.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex items-center justify-between">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                Total
              </p>
              <p className="font-bold text-lg text-gray-900 dark:text-gray-100">
                €{totalPrice.toFixed(2)}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2
               text-gray-900 dark:text-gray-800
               hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                onClick={clear}
              >
                Clear cart
              </button>

              <button
                className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 transition"
                onClick={async () => {
                  if (!isLoggedIn) {
                    window.location.href = "/login";
                    return;
                  }
                  const loadingId = toast.loading("Ordering olive oil...");

                  try {
                    const payload = items.map((i) => ({
                      id: i.id,
                      price: i.price,
                      quantity: i.quantity,
                    }));

                    const created = await createOrdersFromCart(payload);

                    clear();

                    if (created[0]?.id) {
                      toast.success("Order made ✅", { id: loadingId });
                      window.location.href = `/order/${created[0].id}`;
                    } else {
                      toast.success("Order made ✅", { id: loadingId });
                      window.location.href = "/profile";
                    }
                  } catch (e: any) {
                    toast.error(e?.message ?? "Something went wrong", {
                      id: loadingId,
                    });
                    throw e;
                  }
                }}
              >
                Make an order
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
