import { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const API_URL = 'http://10.119.79.225:3000';

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  emoji: string;
};

export default function App() {
  const [productos, setProductos] = useState<Producto[]>([]);

  const cargarProductos = async () => {
    try {
      const respuesta = await fetch(API_URL + '/productos');
      const datos = await respuesta.json();
      setProductos(datos);
    } catch (error) {
      console.log('Error cargando productos:', error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🍴 Food Lab</Text>
      <FlatList
        data={productos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardEmoji}>{item.emoji}</Text>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.nombre}</Text>
              <Text style={styles.cardPrice}>{item.precio} €</Text>
            </View>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 16,
    color: '#111',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#EEF4FF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  cardEmoji: {
    fontSize: 34,
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#172033',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563EB',
    marginTop: 4,
  },
});
