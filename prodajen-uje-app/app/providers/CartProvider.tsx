"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  photo: string | null;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD"; item: Omit<CartItem, "quantity">; quantity?: number }
  | { type: "REMOVE"; id: string }
  | { type: "INCREASE"; id: string }
  | { type: "DECREASE"; id: string }
  | { type: "CLEAR" };

const CART_STORAGE_KEY = "olive_oil_cart_v1";

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const qtyToAdd = action.quantity ?? 1;
      const existing = state.items.find((i) => i.id === action.item.id);

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.item.id
              ? { ...i, quantity: i.quantity + qtyToAdd }
              : i,
          ),
        };
      }

      return {
        items: [...state.items, { ...action.item, quantity: qtyToAdd }],
      };
    }

    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };

    case "INCREASE":
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      };

    case "DECREASE":
      return {
        items: state.items
          .map((i) =>
            i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i,
          )
          .filter((i) => i.quantity > 0),
      };

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

function loadInitialCart(): CartState {
  if (typeof window === "undefined") return { items: [] };
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw) as CartState;
    return parsed?.items ? parsed : { items: [] };
  } catch {
    return { items: [] };
  }
}

type CartContextValue = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const totalItems = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items],
  );

  const totalPrice = useMemo(
    () => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [state.items],
  );

  const value: CartContextValue = {
    items: state.items,
    addToCart: (item, quantity) => dispatch({ type: "ADD", item, quantity }),
    removeFromCart: (id) => dispatch({ type: "REMOVE", id }),
    increase: (id) => dispatch({ type: "INCREASE", id }),
    decrease: (id) => dispatch({ type: "DECREASE", id }),
    clear: () => dispatch({ type: "CLEAR" }),
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
