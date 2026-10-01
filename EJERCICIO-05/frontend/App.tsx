import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

const host = Constants.expoConfig?.hostUri?.split(':')[0] ?? 'localhost';
const API_URL = `http://${host}:3000`;

export default function App() {
  const [mensaje, setMensaje] = useState<string>('');
  
  const cargarMensaje = async () => {
    try {
      const respuesta = await fetch(API_URL + `/mensaje`);
      const data = await respuesta.json();
      setMensaje(data.mensaje);
    } catch (error) {
      console.log('Error fetching mensaje:', error);
    }
  };

  useEffect(() => {
    cargarMensaje();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>El mensaje de la API es:</Text>
      <Text style={styles.mensaje}>{mensaje}</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  mensaje: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
  },
});

