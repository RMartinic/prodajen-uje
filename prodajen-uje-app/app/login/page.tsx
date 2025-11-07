"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Login attempt for: " + formData.email);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-bold text-green-800 text-center mb-6">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Log in to continue to <span className="font-semibold text-green-700">Prodajen Uje</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm"
          >
            Log In
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-green-700 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
