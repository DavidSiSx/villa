import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth } from '../../firebaseConfig'
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut, 
    createUserWithEmailAndPassword 
} from "firebase/auth";

interface User {
    email: string
    name: string
}

interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => boolean;
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser: any) => {
            setUser(firebaseUser)
            setLoading(false)
        })
        return () => unsubscribe()
    },[])

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            return true;
        } catch (error: any) {
            console.log(`Error al iniciar sesión: ${error.message}`);
            return false
        }
    }

    const register = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            return true;
        } catch (error: any) {
            console.log(`Error al registrar: ${error.message}`);
            return false
        }
    }

    const logout = async () => {
        await signOut(auth)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {
     return useContext(AuthContext)
}