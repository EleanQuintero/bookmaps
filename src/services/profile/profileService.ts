import { createClient } from "@/lib/supabase/server";

/**
 * Fetches the profile row for a given user ID from the `profiles` table.
 * Returns { data, error } — callers must handle both cases.
 */
export async function getProfile(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, avatar_url, full_name, maps_generated, created_at, updated_at")
    .eq("id", userId)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Updates the `username` column for a given user ID in the `profiles` table.
 * Returns { data, error } — callers must handle both cases.
 */
export async function updateUsername(userId: string, username: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .update({ username, updated_at: new Date().toISOString() })
    .eq("id", userId)
    .select("id, username")
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}
