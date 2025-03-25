import { useRouter } from "expo-router"
import { useAuth } from "./context/AuthContext"
import { useEffect } from "react"
import { Button, Text, View } from "react-native"
import React = require("react")

export default function HomeScreen() {
    const { user, logout } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.replace('/login')
        }
    }, [user]);

    return (
        <View>
            <Text>Bienvendio {user?.name}</Text>
            <Button
                title="Ir al perfil"
                onPress={() => router.push(`/profile`)}
            />
            <Button
                title="Logout"
                onPress={() => { logout(); router.replace('/login') }}
            />
        </View>
    )
}
