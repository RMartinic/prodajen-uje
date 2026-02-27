import { supabase } from "../lib/supabaseClient";

export type OrderRow = {
  id: string;
  product_id: string;
  buyer_id: string;
  seller_id: string;
  quantity: number;
  total_price: number;
  status: "pending" | "paid" | "shipped" | "completed" | "cancelled";
  created_at: string;
};

export type Order = {
  id: string;
  productId: string;
  buyerId: string;
  sellerId: string;
  quantity: number;
  totalPrice: number;
  status: OrderRow["status"];
  createdAt: string;
};
export type CartItemInput = {
  id: string;
  price: number;
  quantity: number;
};

export const loadOrder = async (orderId: string): Promise<Order | null> => {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id, product_id, buyer_id, seller_id, quantity, total_price, status, created_at
    `,
    )
    .eq("id", orderId)
    .single();

  if (error) {
    console.error("Error fetching order:", error);
    return null;
  }

  const row = data as unknown as OrderRow;

  return {
    id: row.id,
    productId: row.product_id,
    buyerId: row.buyer_id,
    sellerId: row.seller_id,
    quantity: row.quantity,
    totalPrice: row.total_price,
    status: row.status,
    createdAt: row.created_at,
  };
};
export async function createOrdersFromCart(cartItems: CartItemInput[]) {
  if (!cartItems.length) {
    throw new Error("Cart is empty.");
  }

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  const buyerId = authData.user?.id;
  if (!buyerId) throw new Error("You must be logged in to checkout.");

  const productIds = cartItems.map((i) => i.id);

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, owner_id, price")
    .in("id", productIds);

  if (productsError) throw productsError;
  if (!products || products.length === 0)
    throw new Error("Products not found.");

  const ownerByProductId = new Map<string, string>();
  const priceByProductId = new Map<string, number>();

  for (const p of products) {
    ownerByProductId.set(p.id, p.owner_id);
    priceByProductId.set(p.id, Number(p.price));
  }

  const orderRows = cartItems.map((item) => {
    const sellerId = ownerByProductId.get(item.id);
    if (!sellerId) throw new Error(`Missing seller for product ${item.id}`);

    const unitPrice = priceByProductId.get(item.id) ?? Number(item.price);
    const qty = Math.max(1, Number(item.quantity));
    const total = unitPrice * qty;

    return {
      product_id: item.id,
      buyer_id: buyerId,
      seller_id: sellerId,
      quantity: qty,
      total_price: total,
      status: "pending",
    };
  });

  const { data: createdOrders, error: insertError } = await supabase
    .from("orders")
    .insert(orderRows)
    .select("id");

  if (insertError) throw insertError;

  return createdOrders ?? [];
}
