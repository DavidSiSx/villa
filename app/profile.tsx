import { useRouter } from "expo-router"
import { useAuth } from "./context/AuthContext"
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function ProfileScreen() {
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.replace('/login')
        }
    }, [user]);

    return (
        <>
            <View>
                <Text>Perfil</Text>
            </View>
        </>
    )
}
