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
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My dashboard</h1>
            <p className="text-sm text-gray-600">
              Joined {new Date(profile.created_at).toLocaleDateString()}
            </p>
          </div>

          <Link
            href="/sell"
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition shadow-sm"
          >
            + New product
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="px-5 py-4 border-b">
              <h2 className="text-lg font-bold">My products</h2>
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
                    className="transition-transform hover:scale-[1.02]"
                  >
                    <ProductCard product={p} />
                  </Link>
                ))
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="px-5 py-4 border-b">
              <h2 className="text-lg font-bold">My orders</h2>
              <p className="text-sm text-gray-600">{myOrders.length} total</p>
            </div>

            <div className="p-4 space-y-3 max-h-[70vh] overflow-auto">
              {myOrders.length === 0 ? (
                <p className="text-sm text-gray-600">No orders yet.</p>
              ) : (
                myOrders.map((o) => (
                  <div key={o.id} className="border rounded-xl p-4">
                    <p className="font-semibold line-clamp-1">
                      {o.products?.title ?? "Product"}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {o.status} • qty {o.quantity} • €
                      {Number(o.total_price).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(o.created_at).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="px-5 py-4 border-b">
              <h2 className="text-lg font-bold">My sales</h2>
              <p className="text-sm text-gray-600">{mySales.length} total</p>
            </div>

            <div className="p-4 space-y-3 max-h-[70vh] overflow-auto">
              {mySales.length === 0 ? (
                <p className="text-sm text-gray-600">No sales yet.</p>
              ) : (
                mySales.map((s) => (
                  <div key={s.id} className="border rounded-xl p-4">
                    <p className="font-semibold line-clamp-1">
                      {s.products?.title ?? "Product"}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {s.status} • qty {s.quantity} • €
                      {Number(s.total_price).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(s.created_at).toLocaleString()}
                    </p>
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
