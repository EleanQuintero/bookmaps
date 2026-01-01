import { loginUser, newUser } from "@/domain/entities/user"
import { createClient } from "@/lib/supabase/server"




export async function signUp({ username, email, password }: newUser) {

    const supabase = await createClient()


    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username: username
            }
        }
    })

    if (error) {
        throw error
    }

    return data
}

export async function signIn({ email, password }: loginUser) {

    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
        options: {

        }
    })

    if (error) {
        throw error
    }

    return data

}