import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
  } from "react";
  import { auth, db } from "../../firebaseConfig";
  import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword
  } from "firebase/auth";
  import { doc, setDoc } from "firebase/firestore";
  
  // Definimos el tipo de usuario
  interface User {
    uid: string;
    email: string;
    name?: string;
  }
  
  // Definimos qué expone nuestro contexto
  interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    loading: boolean;
  }
  
  // Creamos el contexto; puede ser null si no hay proveedor
  const AuthContext = createContext<AuthContextType | null>(null);
  
  export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
            name: firebaseUser.displayName || ""
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    }, []);
  
    // Función para iniciar sesión
    async function login(email: string, password: string): Promise<boolean> {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        return true;
      } catch (error: any) {
        console.log(`Error al iniciar sesión: ${error.message}`);
        return false;
      }
    }
  
    // Función para registrar un usuario nuevo
    async function register(email: string, password: string): Promise<boolean> {
      try {
        // 1. Crear usuario en Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
  
        // 2. Guardar datos básicos en Firestore
        const docRef = doc(db, "users", firebaseUser.uid);
        await setDoc(docRef, {
          uid: firebaseUser.uid,
          correo: firebaseUser.email,
          nombre: "Juan Pérez", // Valor por defecto
          creadoEn: new Date().toISOString(),
          fotoPerfil: "https://misfotos.com/perfil.jpg",
          biografia: "Apasionado por la programación y los videojuegos.",
          telefono: "+52 123 456 7890",
          idioma: "es",
          favoritos: ["producto1", "producto2"]
        });
  
        return true;
      } catch (error: any) {
        console.log(`Error al registrar: ${error.message}`);
        return false;
      }
    }
  
    // Función para cerrar sesión
    async function logout(): Promise<void> {
      await signOut(auth);
      setUser(null);
    }
  
    return (
      <AuthContext.Provider
        value={{
          user,
          login,
          register,
          logout,
          loading
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
  
  // Custom hook para consumir el contexto
  export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
      // Si el contexto es null, significa que no estás dentro de un <AuthProvider>
      throw new Error("useAuth debe usarse dentro de un <AuthProvider>");
    }
    return context;
  }
  