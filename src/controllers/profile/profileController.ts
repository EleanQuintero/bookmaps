import { getProfile, updateUsername } from "@/services/profile/profileService";

/**
 * Returns the full profile for a given user ID.
 * Shape: { data: profile | null, error: string | null }
 */
export async function getUserProfile(userId: string) {
  const result = await getProfile(userId);
  return result;
}

/**
 * Sets (or updates) the username for a given user ID.
 * Shape: { data: { id, username } | null, error: string | null }
 */
export async function setUsername(userId: string, username: string) {
  const result = await updateUsername(userId, username);
  return result;
}
