import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Alert, Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import { useAuth } from "./context/AuthContext";

export default function LoginScreen() {
  const { login, register } = useAuth();
  const router = useRouter();

  // Estado para alternar entre login y registro
  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      router.replace("/home");
    } else {
      Alert.alert("Error", "El usuario y/o contraseña son incorrectas");
    }
  };

  const handleRegister = async () => {
    const success = await register(email, password);
    if (success) {
      // Redirigimos a la pantalla de perfil para que el usuario complete su información
      router.replace("/profile");
    } else {
      Alert.alert("Error", "No se pudo registrar");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        {isRegister ? "Registro" : "Login"}
      </Text>
      <TextInput
        placeholder="Ingresa tu correo"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{ borderWidth: 1, marginVertical: 5, padding: 8 }}
      />
      <TextInput
        placeholder="Ingresa tu contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginVertical: 5, padding: 8 }}
      />

      {isRegister ? (
        <Button title="Registrar" onPress={handleRegister} />
      ) : (
        <Button title="Ingresar" onPress={handleLogin} />
      )}

      <TouchableOpacity onPress={() => setIsRegister(!isRegister)} style={{ marginTop: 20 }}>
        <Text style={{ color: "blue" }}>
          {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
