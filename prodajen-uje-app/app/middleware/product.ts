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
export async function uploadProductImage(file: File): Promise<string> {
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  const userId = authData.user?.id;
  if (!userId) throw new Error("You must be logged in to upload images.");

  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed.");
  }
  if (file.size > 3 * 1024 * 1024) {
    throw new Error("Image must be smaller than 3MB.");
  }

  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${crypto.randomUUID()}.${ext}`;
  const filePath = `${userId}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
      cacheControl: "3600",
    });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);
  console.log(data.publicUrl);
  return data.publicUrl;
}
export async function createProduct(input: Product) {
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  const userId = authData.user?.id;
  if (!userId) throw new Error("You must be logged in to create a product.");

  const { data, error } = await supabase
    .from("products")
    .insert({
      owner_id: userId,
      title: input.title,
      price: input.price,
      location: input.location,
      sort: input.sort ?? null,
      description: input.description ?? null,
      photo: input.photo ?? null,
    })
    .select("id")
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProduct(productId: string) {
  // (optional) extra safety: ensure user is logged in
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!authData.user) throw new Error("You must be logged in.");

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) throw error;
  return true;
}
