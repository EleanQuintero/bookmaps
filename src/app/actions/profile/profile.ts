"use server";

import { setUsername } from "@/controllers/profile/profileController";
import { getCurrentUser } from "@/controllers/auth/authController";

/**
 * Server Action: sets the username for the currently authenticated user.
 *
 * Returns:
 *   { success: true, username: string }
 *   { success: false, error: string }
 */
export async function setUsernameAction(
  username: string
): Promise<{ success: true; username: string } | { success: false; error: string }> {
  // 1. Resolve the currently authenticated user
  const user = await getCurrentUser();

  if (!user?.id) {
    return { success: false, error: "You must be signed in to set a username." };
  }

  // 2. Delegate to the controller
  const result = await setUsername(user.id, username);

  if (result.error || !result.data) {
    return {
      success: false,
      error: result.error ?? "Failed to save username. Please try again.",
    };
  }

  return { success: true, username: result.data.username ?? username };
}
