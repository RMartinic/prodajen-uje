"use client";
import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Trash2 } from "lucide-react";

const initialCart = [
  {
    id: 1,
    name: "Istrian Olive Oil",
    price: 18,
    quantity: 2,
    image: "/product1.jpg",
  },
  {
    id: 2,
    name: "Šolta Olive Oil",
    price: 13,
    quantity: 1,
    image: "/product3.jpg",
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, qty: number) => {
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-8 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" /> Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-2xl p-4 gap-4"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={150}
                    height={120}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-green-800">{item.name}</h2>
                    <p className="text-gray-600 mb-2">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2">
                      <label className="text-gray-700">Qty:</label>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                        className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 text-right">
              <p className="text-xl font-semibold text-green-800">
                Total: {total.toFixed(2)}€
              </p>
              <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
