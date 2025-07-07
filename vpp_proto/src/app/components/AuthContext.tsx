"use client"

import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface User {
    id: any;
    username: string;
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch("/api/auth");
            if (res.ok) {
                const data = await res.json();
                if (data.user) {
                    setUser({
                        id: data.user.id,
                        username: data.user.username,
                    });
                }
            }
        }
        fetchUser();
    }, []);



    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
