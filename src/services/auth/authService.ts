import { loginUser, newUser } from "@/domain/entities/users/user"
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
        return { data: null, error: error.message }
    }

    return { data, error: null }
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
        return { data: null, error: error.message }
    }

    return { data, error: null }

}

export async function signOut() {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()
    return error

}

export async function signInWithGoogle() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
    })

    if (error) {
        return { data: null, error: error.message }
    }

    return { data, error: null }
}

export async function getCurrentUserData() {
    const supabase = await createClient()

    const currentUserData = await supabase.auth.getUser()

    return currentUserData
}