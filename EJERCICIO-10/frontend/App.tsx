import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const API_URL = 'http://10.119.79.225:3000';

type Mascota = {
  id: number;
  nombre: string;
  likes: number;
};

export default function App() {
  const [mascota, setMascota] = useState<Mascota | null>(null);
  const [likes, setLikes] = useState<number>(14);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const cargarMascota = async () => {
    try {
      setError(null);
      const respuesta = await fetch(API_URL + '/mascotas/1');
      if (!respuesta.ok) {
        throw new Error('No se pudo cargar la mascota');
      }
      const datos: Mascota = await respuesta.json();
      setMascota(datos);
      setLikes(datos.likes);
    } catch (err: any) {
      setError('Error al conectar con la API: ' + (err?.message || 'Error de red'));
    }
  };

  const darLike = async () => {
    try {
      setCargando(true);
      setError(null);
      const respuesta = await fetch(API_URL + '/mascotas/1/like', {
        method: 'PATCH',
      });
      if (!respuesta.ok) {
        throw new Error('Error al enviar like');
      }
      const datos: Mascota = await respuesta.json();
      setMascota(datos);
      setLikes(datos.likes);
    } catch (err: any) {
      setError('Error al actualizar like: ' + (err?.message || 'Error de red'));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarMascota();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.card}>
        <Text style={styles.emoji}>🐶</Text>
        <Text style={styles.title}>{mascota ? mascota.nombre : 'Toby'}</Text>
        <Text style={styles.likes}>❤️ {likes} likes</Text>

        {cargando ? (
          <ActivityIndicator size="small" color="#2563EB" style={styles.loader} />
        ) : (
          <View style={styles.buttonWrapper}>
            <Button
              title="❤️ Me gusta"
              onPress={darLike}
              color="#2563EB"
            />
          </View>
        )}

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emoji: {
    fontSize: 72,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
  },
  likes: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 18,
    color: '#DC2626',
  },
  buttonWrapper: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  loader: {
    marginVertical: 10,
  },
  errorText: {
    color: '#DC2626',
    marginTop: 14,
    textAlign: 'center',
    fontSize: 13,
  },
});
