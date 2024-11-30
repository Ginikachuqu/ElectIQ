import { createContext, useState, useEffect } from "react";

import { supabase } from "../lib/supabaseclient";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)

    console.log(supabase)

    const signUp = async (email, password, options) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                ...options
            })

            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

    }, [])

    return (
        <AuthContext.Provider
            value={{ 
                user,
                signUp
             }}
        >
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext