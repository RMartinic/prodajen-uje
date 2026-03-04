"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import ProductCard from "@/app/components/productCard";
import {
  loadOrder,
  updateOrderStatus,
  type Order,
} from "../../middleware/order";
import { loadProduct, Product } from "@/app/middleware/product";
import { fetchMyProfile } from "@/app/middleware/profile";
import { supabase } from "@/app/lib/supabaseClient";
import toast from "react-hot-toast";

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  type Profile = {
    id: string;
    username: string | null;
    phone: string | null;
    created_at: string;
  };

  const [order, setOrder] = useState<Order | null>(null);
  const [buyerData, setBuyerData] = useState<Profile | null>();
  const [sellerData, setSellerData] = useState<Profile | null>();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [myUserId, setMyUserId] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;

    let mounted = true;

    const run = async () => {
      setLoading(true);
      try {
        const o = await loadOrder(id);
        if (!o) {
          if (mounted) {
            setOrder(null);
            setProduct(null);
            setBuyerData(null);
            setSellerData(null);
          }
          return;
        }

        if (!mounted) return;
        setOrder(o);
        const myProfileData = await supabase.auth.getUser();
        const [buyer, seller] = await Promise.all([
          fetchMyProfile(o.buyerId),
          fetchMyProfile(o.sellerId),
        ]);
        if (!mounted) return;
        setBuyerData(buyer);
        setSellerData(seller);
        setMyUserId(myProfileData.data.user?.id ?? null);

        const p = await loadProduct(o.productId);
        if (!mounted) return;
        setProduct(p);
      } catch (e) {
        console.error(e);
        if (mounted) {
          setOrder(null);
          setProduct(null);
          setBuyerData(null);
          setSellerData(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, [id]);

  const isSeller = !!myUserId && myUserId === order?.sellerId;
  const isBuyer = !!myUserId && myUserId === order?.buyerId;

  const canAccept = isSeller && order.status === "pending";
  const canShip = isSeller && order.status === "paid";
  const canComplete = isBuyer && order.status === "shipped";
  const canCancel =
    isSeller && (order.status === "pending" || order.status === "paid");
  const changeStatus = async (
    nextStatus: "paid" | "shipped" | "completed" | "cancelled",
  ) => {
    const loadingId = toast.loading("Updating order...");
    try {
      setUpdating(true);
      await updateOrderStatus(order?.id || "", nextStatus);
      setOrder((prev) => (prev ? { ...prev, status: nextStatus } : prev));
      toast.success("Order updated!", { id: loadingId });
    } catch (e: any) {
      toast.error(e?.message ?? "Something went wrong", { id: loadingId });
      throw e;
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="p-8">Loading...</p>;
  if (!order) return <p className="p-8">Order not found</p>;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push("/profile")}
            className="text-green-700 hover:text-green-800 font-medium"
          >
            ← Back to Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {product ? (
              <Link
                href={`/product/${order.productId}`}
                className="text-green-700 hover:text-green-800 font-medium"
              >
                <ProductCard product={product} quantity={order.quantity} />
              </Link>
            ) : (
              <span>"No products in order"</span>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-md border p-6 h-fit">
            <h1 className="text-2xl font-bold text-gray-900">Order</h1>
            <p className="text-sm text-gray-600 mt-1 break-all">#{order.id}</p>

            <div className="mt-5 space-y-3 text-sm text-gray-700">
              <div className="flex justify-between gap-4">
                <span>Status</span>
                <span className="font-semibold">{order.status}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Quantity</span>
                <span className="font-semibold">{order.quantity}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Total</span>
                <span className="font-semibold">
                  €{Number(order.totalPrice).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Created</span>
                <span className="font-semibold">
                  {new Date(order.createdAt).toLocaleString("hr-HR")}
                </span>
              </div>
            </div>

            <div className="mt-6 text-xs text-gray-500 space-y-1">
              <p className="break-all">Buyer: {buyerData?.username}</p>
              <p className="break-all">Seller: {sellerData?.username}</p>
            </div>
            <div className="mt-6 space-y-2">
              {canAccept && (
                <button
                  disabled={updating}
                  onClick={() => changeStatus("paid")}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-60"
                >
                  Accept order
                </button>
              )}

              {canShip && (
                <button
                  disabled={updating}
                  onClick={() => changeStatus("shipped")}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-60"
                >
                  Mark as shipped
                </button>
              )}

              {canComplete && (
                <button
                  disabled={updating}
                  onClick={() => changeStatus("completed")}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-60"
                >
                  Mark as completed
                </button>
              )}

              {canCancel && (
                <button
                  disabled={updating}
                  onClick={() => {
                    const ok = confirm("Cancel this order?");
                    if (ok) changeStatus("cancelled");
                  }}
                  className="w-full border border-red-300 text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition disabled:opacity-60"
                >
                  Cancel order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
