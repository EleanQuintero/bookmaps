import { loginUser, newUser } from "@/domain/entities/user";
import { signUp, signIn, getCurrentUserData, signOut } from "@/services/authService";

export async function createUser({ username, email, password }: newUser) {
    const result = await signUp({ username, email, password })
    return result
}

export async function signInUser({ email, password }: loginUser) {
    const result = await signIn({ email, password })
    return result

}


export async function signOutUser() {
    const error = await signOut()

    if (error) return error


}


export async function getCurrentUser() {
    const { data } = await getCurrentUserData()

    const user = {
        id: data.user?.id,
        email: data.user?.email,
        username: data.user?.user_metadata.username
    }
    return user
} 
