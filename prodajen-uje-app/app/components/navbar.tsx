"use client";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X, LogInIcon } from "lucide-react";
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-green-700">
          Prodajen<span className="text-green-500">Uje</span>
        </Link>
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link href="/" className="hover:text-green-600 transition">Home</Link>
          <Link href="/about" className="hover:text-green-600 transition">About</Link>
          <Link href="/marketplace" className="hover:text-green-600 transition">Marketplace</Link>
          <Link href="/contact" className="hover:text-green-600 transition">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
             <Link
      href="/login"
      className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm"
    >
      Log In
    </Link>

          <Link
          href="/cart"
          className="flex items-center gap-1 text-gray-700 hover:text-green-600 transition"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Cart</span>
        </Link>

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col px-4 py-2 space-y-2">
            <Link href="/" className="hover:text-green-600 transition" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/about" className="hover:text-green-600 transition" onClick={() => setOpen(false)}>About</Link>
            <Link href="/shop" className="hover:text-green-600 transition" onClick={() => setOpen(false)}>Shop</Link>
            <Link href="/contact" className="hover:text-green-600 transition" onClick={() => setOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
