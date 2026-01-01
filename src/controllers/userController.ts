import { loginUser, newUser } from "@/domain/entities/user";
import { signUp, signIn } from "@/services/userService";

export async function createUser({ username, email, password }: newUser) {
    try {
        const data = await signUp({ username, email, password })

        return data
    } catch (error) {
        console.error("Error creating user: ", error);
    }
}

export async function signInUser({ email, password }: loginUser) {

    try {
        const data = await signIn({ email, password })
        return data

    } catch (error) {
        console.error("Error sigin session", error)
    }

}