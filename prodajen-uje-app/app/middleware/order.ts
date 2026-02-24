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
