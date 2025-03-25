import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Image, ActivityIndicator, Alert, ScrollView } from "react-native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Ajusta la ruta según tu proyecto
import { useAuth } from "./context/AuthContext"; 
import { useRouter } from "expo-router"; // <-- Importa useRouter

export default function ProfileScreen() {
  const { user } = useAuth()!;
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Para redirigir
  const router = useRouter();

  // Estados para edición
  const [nombre, setNombre] = useState("");
  const [biografia, setBiografia] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState("");
  const [telefono, setTelefono] = useState("");
  const [idioma, setIdioma] = useState("es");

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile(data);
          setNombre(data.nombre);
          setBiografia(data.biografia);
          setFotoPerfil(data.fotoPerfil);
          setTelefono(data.telefono);
          setIdioma(data.idioma);
        } else {
          Alert.alert("Info", "No se encontró perfil para este usuario.");
        }
      } catch (error) {
        console.error("Error al obtener perfil:", error);
        Alert.alert("Error", "No se pudo cargar el perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) return;
    setUpdating(true);
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { nombre, biografia, fotoPerfil, telefono, idioma });
      
      Alert.alert("Éxito", "Perfil actualizado correctamente");
      setProfile({ ...profile, nombre, biografia, fotoPerfil, telefono, idioma });
      
      // Redirige al home tras actualizar
      router.replace("/home");

    } catch (error) {
      console.error("Error actualizando perfil:", error);
      Alert.alert("Error", "No se pudo actualizar el perfil");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: "center" }} />;
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>Perfil de Usuario</Text>
      
      {fotoPerfil ? (
        <Image 
          source={{ uri: fotoPerfil }}
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }}
        />
      ) : (
        <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: "#ccc", marginBottom: 10, justifyContent: "center", alignItems: "center" }}>
          <Text>Sin Foto</Text>
        </View>
      )}

      <Text style={{ marginBottom: 10 }}>Correo: {profile.correo}</Text>

      <Text>Nombre:</Text>
      <TextInput 
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ingresa tu nombre"
        style={{ borderWidth: 1, padding: 5, marginVertical: 5 }}
      />

      <Text>Biografía:</Text>
      <TextInput 
        value={biografia}
        onChangeText={setBiografia}
        placeholder="Escribe tu biografía"
        multiline
        style={{ borderWidth: 1, padding: 5, marginVertical: 5, height: 80 }}
      />

      <Text>Foto de Perfil (URL):</Text>
      <TextInput 
        value={fotoPerfil}
        onChangeText={setFotoPerfil}
        placeholder="URL de tu foto"
        style={{ borderWidth: 1, padding: 5, marginVertical: 5 }}
      />

      <Text>Teléfono:</Text>
      <TextInput 
        value={telefono}
        onChangeText={setTelefono}
        placeholder="Número de teléfono"
        keyboardType="phone-pad"
        style={{ borderWidth: 1, padding: 5, marginVertical: 5 }}
      />

      <Text>Idioma:</Text>
      <TextInput 
        value={idioma}
        onChangeText={setIdioma}
        placeholder="es / en / etc."
        style={{ borderWidth: 1, padding: 5, marginVertical: 5 }}
      />

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>Favoritos:</Text>
      {profile.favoritos && profile.favoritos.length > 0 ? (
        profile.favoritos.map((item: string, index: number) => (
          <Text key={index}>- {item}</Text>
        ))
      ) : (
        <Text>No hay favoritos</Text>
      )}

      <Button 
        title={updating ? "Actualizando..." : "Actualizar Perfil"}
        onPress={handleUpdateProfile}
        disabled={updating}
      />
    </ScrollView>
  );
}
