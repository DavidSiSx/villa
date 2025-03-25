import { Stack } from "expo-router";
import { AuthProvider } from "./context/AuthContext";
import React = require("react");

export default function Layout() {
    
    return(
        <AuthProvider>
            <Stack screenOptions={{headerShown: false}} />
        </AuthProvider>
    )
}