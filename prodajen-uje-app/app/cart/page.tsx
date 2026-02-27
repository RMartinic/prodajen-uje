"use client";

import { useCart } from "@/app/providers/CartProvider";
import ProductCard from "@/app/components/productCard";
import type { Product } from "../middleware/product";
import { createOrdersFromCart } from "../middleware/order";
import { useEffect, useState } from "react";
import { getMyUserId } from "../middleware/profile";

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
                  <ProductCard product={productForCard} quantity={i.quantity} />
                  <div className="bg-white border rounded-xl p-4 flex items-center gap-3">
                    <button
                      className="border rounded-lg px-3 py-1"
                      onClick={() => decrease(i.id)}
                    >
                      −
                    </button>

                    <span className="min-w-8 text-center font-medium">
                      {i.quantity}
                    </span>

                    <button
                      className="border rounded-lg px-3 py-1"
                      onClick={() => increase(i.id)}
                    >
                      +
                    </button>

                    <div className="ml-auto font-semibold">
                      €{(i.price * i.quantity).toFixed(2)}
                    </div>

                    <button
                      className="ml-4 text-red-600 hover:underline"
                      onClick={() => removeFromCart(i.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="bg-white border rounded-2xl p-4 flex items-center justify-between">
              <p className="font-semibold">Total</p>
              <p className="font-bold text-lg">€{totalPrice.toFixed(2)}</p>
            </div>

            <div className="flex gap-3">
              <button className="border rounded-lg px-4 py-2" onClick={clear}>
                Clear cart
              </button>
              <button
                className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 transition"
                onClick={async () => {
                  if (!isLoggedIn) {
                    window.location.href = "/login";
                    return;
                  }

                  try {
                    const payload = items.map((i) => ({
                      id: i.id,
                      price: i.price,
                      quantity: i.quantity,
                    }));

                    const created = await createOrdersFromCart(payload);

                    clear();

                    if (created[0]?.id) {
                      window.location.href = `/order/${created[0].id}`;
                    } else {
                      window.location.href = "/profile";
                    }
                  } catch (e: any) {
                    alert(e.message || "Checkout failed");
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
