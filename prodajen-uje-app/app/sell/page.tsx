"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createProduct, uploadProductImage } from "../middleware/product";
import { supabase } from "../lib/supabaseClient";

export default function SellPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<string>("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState<string>("");
  const [checkAuth, setCheckAuth] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onPickFile = (f: File | null) => {
    setFile(f);
    if (!f) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(f);
    setPreview(url);
  };
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data.user) {
          setUserId("");
          setCheckAuth(false);
        } else {
          setUserId(data.user.id);
          setCheckAuth(true);
        }
      } catch (e) {
        setUserId("");
        setCheckAuth(false);
      }
    };
    checkAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) return setError("Title is required.");
    if (!location.trim()) return setError("Location is required.");
    const numericPrice = Number(price);
    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      return setError("Price must be a positive number.");
    }
    setLoading(true);
    try {
      let photoUrl: string | null = null;
      if (file) {
        photoUrl = await uploadProductImage(file);
      }

      const created = await createProduct({
        title: title.trim(),
        owner_id: userId,
        id: "",
        sellerUsername: "",
        price: numericPrice,
        location: location.trim(),
        sort: sort.trim() ? sort.trim() : null,
        description: description.trim() ? description.trim() : null,
        photo: photoUrl,
        created_at: new Date().toISOString(),
      });

      window.location.href = `/product/${created.id}`;
    } catch (err: any) {
      setError(err.message ?? "Failed to create product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      {!checkAuth ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
          <div className="bg-white rounded-2xl shadow-md border p-6 max-w-md text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              You need to be logged in
            </h2>
            <p className="text-gray-600 mb-6">
              Please log in to create and sell products.
            </p>
            <a
              href="/login"
              className="inline-block bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition"
            >
              Log in
            </a>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Sell olive oil
          </h1>
          <p className="text-gray-600 mb-8">
            Fill out the details. You can add a photo (optional).
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-md border p-6 space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product photo (optional)
              </label>

              {preview ? (
                <div className="relative w-full h-56 rounded-xl overflow-hidden border mb-3">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-56 rounded-xl border bg-gray-50 flex items-center justify-center text-gray-500 mb-3">
                  No photo selected
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
              />
              <p className="text-xs text-gray-500 mt-1">
                JPG/PNG/WebP up to ~3MB.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="e.g. Extra virgin olive oil 1L"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (€) *
              </label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="e.g. 15.00"
                inputMode="decimal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="e.g. Šolta"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort (optional)
              </label>
              <input
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="e.g. Oblica, Šoltanka"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 min-h-28"
                placeholder="Tell buyers about taste, harvest, acidity..."
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-60"
            >
              {loading ? "Publishing..." : "Publish product"}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
