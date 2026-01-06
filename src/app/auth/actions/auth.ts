"use server"
import { createUser, getCurrentUser, signInUser, signOutUser } from "@/controllers/authController";
import { loginUser, newUser } from "@/domain/entities/users/user";
import { redirect } from "next/navigation";


export async function login({ email, password }: loginUser) {
    const result = await signInUser({ email, password })

    if (result.error) {
        return { success: false, error: result.error }
    }

    redirect('/dashboard')

}

export async function signUp({ username, email, password }: newUser) {

    const result = await createUser({ username, email, password })

    if (result.error) {
        return { success: false, error: result.error }
    }

}

export async function signOut() {
    const error = await signOutUser()
    redirect('/')

}

export async function getUser() {
    try {
        const user = await getCurrentUser()

        return user

    } catch (error) {

    }
}


