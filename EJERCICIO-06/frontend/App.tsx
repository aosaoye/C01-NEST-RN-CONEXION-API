import { useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const API_URL = 'http://10.119.79.225:3000';

export default function App() {
  const [mensaje, setMensaje] = useState('🔴 Sin conectar');

  const cargarMensaje = async () => {
    try {
      const respuesta = await fetch(API_URL + '/mensaje');
      const datos = await respuesta.json();
      setMensaje('🟢 ' + datos.texto);
    } catch (error) {
      console.log('Error de conexión:', error);
      setMensaje('🔴 Error de conexión');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Estado del backend</Text>
      <Text style={styles.status}>{mensaje}</Text>
      <Button title="Conectar" onPress={cargarMensaje} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#111',
  },
  status: {
    fontSize: 18,
    marginBottom: 24,
    color: '#333',
  },
});
