import { supabase } from "../lib/supabaseClient";

export async function getMyUserId() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user?.id ?? null;
}

export async function fetchMyProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, phone, created_at")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

export async function fetchMyProducts(userId: string) {
  const { data, error } = await supabase
    .from("products")
    .select("id, title, price, photo, sort, location, created_at")
    .eq("owner_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function fetchMyOrders(userId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id, quantity, total_price, status, created_at,
      products:product_id ( id, title, photo, price )
    `,
    )
    .eq("buyer_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function fetchMySales(userId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id, quantity, total_price, status, created_at,
      products:product_id ( id, title, photo, price )
    `,
    )
    .eq("seller_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}
