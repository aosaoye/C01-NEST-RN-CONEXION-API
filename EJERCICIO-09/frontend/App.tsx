import { useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const API_URL = 'http://10.119.79.225:3000';

type Heroe = {
  id: number;
  nombre: string;
  poder: number;
  universo: string;
};

export default function App() {
  const [id, setId] = useState('1');
  const [heroe, setHeroe] = useState<Heroe | null>(null);
  const [error, setError] = useState<string | null>(null);

  const buscarHeroe = async () => {
    try {
      setError(null);
      const respuesta = await fetch(API_URL + '/heroes/' + id);
      if (!respuesta.ok) {
        setHeroe(null);
        setError('Héroe no encontrado');
        return;
      }
      const data = await respuesta.json();
      setHeroe(data);
    } catch (err) {
      console.log('Error buscando héroe:', err);
      setError('Error de conexión');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🦸 Busca superhéroe</Text>
      <TextInput
        style={styles.input}
        value={id}
        onChangeText={setId}
        keyboardType="numeric"
        placeholder="Introduce ID del héroe"
      />
      <Button title="Buscar" onPress={buscarHeroe} />

      {heroe && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{heroe.nombre}</Text>
          <Text style={styles.cardDetail}>⚡ Poder: {heroe.poder}</Text>
          <Text style={styles.cardDetail}>🌌 Universo: {heroe.universo}</Text>
        </View>
      )}

      {error && <Text style={styles.error}>{error}</Text>}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 16, color: '#111' },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 12,
    marginVertical: 14,
    fontSize: 16,
  },
  card: {
    marginTop: 24,
    padding: 20,
    backgroundColor: '#EEF4FF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  cardTitle: { fontSize: 22, fontWeight: '700', color: '#1E293B', marginBottom: 8 },
  cardDetail: { fontSize: 16, color: '#475569', marginTop: 4 },
  error: { marginTop: 18, color: '#DC2626', fontSize: 16, fontWeight: '600' },
});
