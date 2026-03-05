"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X, LogInIcon } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { logOut } from "../middleware/auth";
import { useCart } from "../providers/CartProvider";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const { totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
        return;
      }
      setSession(data.session);
    };

    getSession();
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 border-b border-transparent dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1 text-2xl font-bold text-green-700 dark:text-green-400"
        >
          Prodajen
          <span className="text-green-500 dark:text-green-300">Uje</span>
          <img
            src="/favicon.ico"
            alt="logo"
            className="inline-block h-[1em] w-auto align-middle"
          />
        </Link>

        <div className="hidden md:flex space-x-8 text-gray-700 dark:text-gray-200 font-medium">
          <Link
            href="/"
            className="hover:text-green-600 dark:hover:text-green-400 transition"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-green-600 dark:hover:text-green-400 transition"
          >
            About
          </Link>
          <Link
            href="/marketplace"
            className="hover:text-green-600 dark:hover:text-green-400 transition"
          >
            Marketplace
          </Link>
          <Link
            href="/contact"
            className="hover:text-green-600 dark:hover:text-green-400 transition"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {!session ? (
            <Link
              href="/login"
              className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm"
            >
              Log In
            </Link>
          ) : (
            <button
              onClick={async () => {
                await logOut();
                window.location.reload();
              }}
              className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm"
            >
              Log Out
            </button>
          )}

          <Link
            href="/cart"
            className="hidden md:flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="relative">
              Cart
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-4 bg-green-600 text-white text-xs rounded-full px-2 py-0.5">
                  {totalItems}
                </span>
              )}
            </span>
          </Link>

          {session && (
            <Link
              href="/profile"
              className="hidden md:block text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition font-medium"
            >
              My profile
            </Link>
          )}

          <button
            className="md:hidden text-gray-800 dark:text-gray-100"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col px-4 py-2 space-y-2 text-gray-700 dark:text-gray-200">
            <Link
              href="/"
              className="hover:text-green-600 dark:hover:text-green-400 transition"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-green-600 dark:hover:text-green-400 transition"
              onClick={() => setOpen(false)}
            >
              About
            </Link>
            <Link
              href="/marketplace"
              className="hover:text-green-600 dark:hover:text-green-400 transition"
              onClick={() => setOpen(false)}
            >
              Marketplace
            </Link>
            <Link
              href="/contact"
              className="hover:text-green-600 dark:hover:text-green-400 transition"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/cart"
              className="hover:text-green-600 dark:hover:text-green-400 transition"
              onClick={() => setOpen(false)}
            >
              <ShoppingCart className="w-5 h-5 inline" />
              <span className="ml-2">
                Cart
                {totalItems > 0 && (
                  <span className="relative -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-2 py-0.5">
                    {totalItems}
                  </span>
                )}
              </span>
            </Link>
            {session && (
              <Link
                href="/profile"
                className="hover:text-green-600 dark:hover:text-green-400 transition"
                onClick={() => setOpen(false)}
              >
                My profile
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
