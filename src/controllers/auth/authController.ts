import { loginUser, newUser } from "@/domain/entities/users/user";
import { signUp, signIn, signInWithGoogle, getCurrentUserData, signOut } from "@/services/auth/authService";
import { getProfile } from "@/services/profile/profileService";

export async function createUser({ username, email, password }: newUser) {
    const result = await signUp({ username, email, password })
    return result
}

export async function signInUser({ email, password }: loginUser) {
    const result = await signIn({ email, password })
    return result

}


export async function signInWithGoogleUser() {
    const result = await signInWithGoogle()
    return result
}

export async function signOutUser() {
    const error = await signOut()

    if (error) return error


}


export async function getCurrentUser() {
    const { data } = await getCurrentUserData()

    if (!data.user) {
        return null
    }

    // Fetch username from the profiles table (source of truth).
    // Google OAuth users will not have a username in user_metadata,
    // so we must always read from the DB.
    const { data: profile } = await getProfile(data.user.id)

    const username = profile?.username ?? null

    const user = {
        id: data.user.id,
        email: data.user.email ?? null,
        username,
        needsUsername: username === null || username === "",
    }

    return user
} 
