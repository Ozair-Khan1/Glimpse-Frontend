'use client'

import { createContext, useContext, useEffect, useState } from "react";
import api from "./api";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext()


export const AuthProvider = ({children}) => {

    const pathName = usePathname()

    const router = useRouter()

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true)

    const checkUserStatus = async () => {
        try {
            console.log('checking')
            const session = await api.get('/api/auth/get-user')
            setUser(session.data)

            if(session.data.user) {
                router.push('/home')
            } else {
                router.push('/signup')
            }
        } catch (error) {
            setUser(null)
            router.push('/signup')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkUserStatus()
    }, []);

    const logout = async () => {
        try {
            await api.post('/api/auth/logout')

            setUser(null)

            router.push('/signup')
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <AuthContext.Provider value={{user, setUser, setLoading, loading, checkUserStatus, logout}}>
            {children}
        </AuthContext.Provider>
    )

}


export const useAuth = () => useContext(AuthContext)