"use server"

import { createUser, signInUser } from "@/controllers/userController";
import { loginUser, newUser } from "@/domain/entities/user";

export async function login({ email, password }: loginUser) {
    try {
        const session = await signInUser({ email, password })

        console.log(session)
    } catch (error) {

    }
    console.log("Logging in user: ", email);

}

export async function signUp({ username, email, password }: newUser) {
    try {
        const userData = await createUser({ username, email, password })

        console.log("User signed up: ", userData);


    } catch (error) {
        console.log("Failed to sign up user with email: ", email);
        const errorMessage = "Error signing up user: "
        return errorMessage

    }

}


