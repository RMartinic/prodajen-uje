import { supabase } from "../lib/supabaseClient";

export async function SignUpWithEmail(params: {
  email: string;
  password: string;
  username: string;
  phone?: string;
}) {
  const { email, password, username, phone } = params;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  const userId = data.user?.id;
  if (!userId) throw new Error("No user rreturn from signUp.");
  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: userId,
      username,
      phone: phone ?? null,
    },
    {
      onConflict: "id",
    },
  );
  if (profileError) throw profileError;

  return data;
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw Error;
  return data;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
