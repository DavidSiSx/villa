import { useRouter } from "expo-router"
import { useState } from "react"
import { Alert, Button, Text, TextInput, View } from "react-native"
import { useAuth } from "./context/AuthContext"

export default function LoginScreen() {
    const { login, register } = useAuth()
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handleLogin = async () => {
        const success = await login(email, password)

        if (success) {
            router.replace('/home')
        } else {
            Alert.alert('Error', 'El usuario y/o contraseña son incorrectas')
        }
    }
    
    const handleRegister = async () => {
        const success = await register(email, password)

        if (success) {
            Alert.alert('Registro Exitoso', 'Ya puedes iniciar sesión')
        } else {
            Alert.alert('Error', 'No se pudo registrar')
        }
    }

    return (
        <>
        <View>
            <Text>Login</Text>
            <TextInput 
                placeholder="Ingresa tu correo"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput 
                placeholder="Ingresa tu contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button 
                title="Ingresar"
                onPress={handleLogin}
            />
            <Button 
                title="Registrer"
                onPress={handleRegister}
            />
        </View>
        </>
    )
}
