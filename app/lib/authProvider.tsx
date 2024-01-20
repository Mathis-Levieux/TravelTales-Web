"use client"

import { createContext, useState, useContext, useEffect } from "react";
import { handleLogIn } from "./actions";
import { Session } from "./types";
import { decodeJwt } from "jose";
type AuthProviderProps = {
    children: React.ReactNode
}

type AuthContextValue = {
    session: Session | null,
    setSession: (session: Session) => void,
    login: (formData: FormData) => Promise<void>,
    logout: () => void,
    loading: boolean
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {

    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const login = async (formData: FormData) => {
        const data = await handleLogIn(formData);
        setSession(data);
    }

    const logout = () => {
        setSession(null);
    }

    useEffect(() => {
        setLoading(true)
        const accessToken = document.cookie.split(';').find((cookie) => cookie.includes('access_token'));
        if (accessToken) {
            const jwt = accessToken.split('=')[1];
            try {
                const payload = decodeJwt(jwt);
                setSession({ ...payload } as Session);
            } catch (error) {
                setSession(null);
            }
        }
        setLoading(false)
    }, []);

    return (
        <AuthContext.Provider value={{ loading, session, setSession, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}



export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context;
}