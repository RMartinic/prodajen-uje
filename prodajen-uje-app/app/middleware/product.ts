import { supabase } from "../lib/supabaseClient";

export type ProductRow = {
  id: string;
  owner_id: string;
  title: string;
  description: string | null;
  price: number;
  photo: string | null;
  sort: string | null;
  location: string;
  created_at: string;
  profiles: { username: string } | null;
};

export type Product = {
  id: string;
  owner_id: string;
  title: string;
  description: string | null;
  price: number;
  photo: string | null;
  sort: string | null;
  location: string;
  created_at: string;
  sellerUsername: string;
};

export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id, owner_id, title, price, photo, description, sort, location, created_at,
      profiles:owner_id ( username )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) throw error;

  const rows = (data ?? []) as unknown as ProductRow[];

  return rows.map((row) => ({
    id: row.id,
    owner_id: row.owner_id,
    title: row.title,
    description: row.description,
    price: row.price,
    photo: row.photo,
    sort: row.sort,
    location: row.location,
    created_at: row.created_at,
    sellerUsername: row.profiles?.username ?? "Unknown seller",
  }));
};

export const loadProduct = async (id: string): Promise<Product> => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id, owner_id, title, price, photo, description, sort, location, created_at,
      profiles:owner_id ( username )
    `,
    )
    .eq("id", id)
    .single();
  console.log(data);

  if (error) {
    console.error("Error fetching product:", error);
    throw error;
  }

  const row = data as unknown as ProductRow;
  return {
    id: row.id,
    owner_id: row.owner_id,
    title: row.title,
    description: row.description,
    price: row.price,
    photo: row.photo,
    sort: row.sort,
    location: row.location,
    created_at: row.created_at,
    sellerUsername: row.profiles?.username ?? "Unknown seller",
  };
};
