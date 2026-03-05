"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  getMyUserId,
  fetchMyProfile,
  fetchMyProducts,
  fetchMyOrders,
  fetchMySales,
} from "../middleware/profile";
import ProductCard from "../components/productCard";

type Profile = {
  id: string;
  username: string | null;
  phone: string | null;
  created_at: string;
};

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [myProducts, setMyProducts] = useState<any[]>([]);
  const [myOrders, setMyOrders] = useState<any[]>([]);
  const [mySales, setMySales] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        const userId = await getMyUserId();
        if (!userId) {
          window.location.href = "/login";
          return;
        }

        const [p, products, orders, sales] = await Promise.all([
          fetchMyProfile(userId),
          fetchMyProducts(userId),
          fetchMyOrders(userId),
          fetchMySales(userId),
        ]);

        if (!mounted) return;

        setProfile(p);
        setMyProducts(products);
        setMyOrders(orders);
        setMySales(sales);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    run();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <p className="p-8">Loading...</p>;
  if (!profile) return <p className="p-8">Profile not found</p>;

  const username = profile.username ?? "Unnamed";
  const phone = profile.phone ?? "";

  return (
    <main className="min-h-screen bg-gray-50 relative">
      <div className="fixed top-20 right-6 z-20 bg-white border shadow-md rounded-xl px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center font-bold">
          {username.slice(0, 1).toUpperCase()}
        </div>

        <div className="leading-tight">
          <p className="font-semibold text-gray-900">{username}</p>
          {phone && <p className="text-xs text-gray-600">{phone}</p>}
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-8">
          <div className="max-w-[50%] sm:max-w-none">
            <h1 className="text-3xl font-bold text-gray-900">My dashboard</h1>
            <p className="text-sm text-gray-600">
              Joined {new Date(profile.created_at).toLocaleDateString()}
            </p>
          </div>

          <Link
            href="/sell"
            className="mt-9 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition shadow-sm"
          >
            + New product
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                My products
              </h2>
              <p className="text-sm text-gray-600">
                {myProducts.length} listed
              </p>
            </div>

            <div className="p-4 space-y-3 max-h-[70vh] overflow-auto">
              {myProducts.length === 0 ? (
                <p className="text-sm text-gray-600">
                  You haven’t listed any products yet.
                </p>
              ) : (
                myProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    className="block transition-transform hover:scale-[1.02] mb-3"
                  >
                    <ProductCard product={p} />
                  </Link>
                ))
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                My orders
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                {myOrders.length} total
              </p>
            </div>

            <div className="p-4 space-y-3 max-h-[70vh] overflow-auto">
              {myOrders.length === 0 ? (
                <p className="text-sm text-gray-600">No orders yet.</p>
              ) : (
                myOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-xl p-4 hover:bg-green-50 transition-colors"
                  >
                    <p className="font-semibold line-clamp-1 text-green-800">
                      {order.products?.title ?? "Product"}
                    </p>

                    <p className="text-xs text-gray-600 mt-1">
                      {order.status} • Qty: {order.quantity} • €
                      {Number(order.total_price).toFixed(2)}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(order.created_at).toLocaleString("hr-HR")}
                    </p>

                    <div className="mt-3 flex justify-end">
                      <a
                        href={`/order/${order.id}`}
                        className="text-sm bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-700 transition"
                      >
                        View order
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                My sales
              </h2>
              <p className="text-sm text-gray-600">{mySales.length} total</p>
            </div>

            <div className="p-4 space-y-3 max-h-[70vh] overflow-auto">
              {mySales.length === 0 ? (
                <p className="text-sm text-gray-600">No sales yet.</p>
              ) : (
                mySales.map((s) => (
                  <div
                    key={s.id}
                    className="border rounded-xl p-4 hover:bg-green-50 transition-colors"
                  >
                    <p className="font-semibold line-clamp-1 text-green-800">
                      {s.products?.title ?? "Product"}
                    </p>

                    <p className="text-xs text-gray-600 mt-1">
                      {s.status} • qty {s.quantity} • €
                      {Number(s.total_price).toFixed(2)}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(s.created_at).toLocaleString("hr-HR")}
                    </p>

                    <div className="mt-3 flex justify-end">
                      <a
                        href={`/order/${s.id}`}
                        className="text-sm bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-700 transition"
                      >
                        View order
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
