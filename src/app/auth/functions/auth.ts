import { loginUser, newUser } from "@/app/domain/entities/user";

export function login({ email, password }: loginUser) {

    console.log("Logging in user: ", email);

}

export function signUp({ username, email, password }: newUser) {

    console.log("Signing up user: ", username);

}
