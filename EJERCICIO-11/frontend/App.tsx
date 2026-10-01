import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const API_URL = 'http://10.119.79.225:3000';

type Producto = {
  id: number;
  nombre: string;
  precio: number;
};

export default function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      setError(null);
      const r = await fetch(API_URL + '/productos');
      if (!r.ok) {
        throw new Error('Error al cargar la lista de productos');
      }
      const datos: Producto[] = await r.json();
      setProductos(datos);
    } catch (err: any) {
      setError(err?.message || 'Error de conexión');
    } finally {
      setCargando(false);
    }
  };

  const crearProducto = async () => {
    if (!nombre.trim() || !precio.trim()) {
      Alert.alert('Campos requeridos', 'Por favor, introduce el nombre y el precio.');
      return;
    }

    const precioNumero = Number(precio);
    if (isNaN(precioNumero) || precioNumero <= 0) {
      Alert.alert('Precio inválido', 'Introduce un valor numérico positivo para el precio.');
      return;
    }

    try {
      setGuardando(true);
      setError(null);
      const r = await fetch(API_URL + '/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre.trim(),
          precio: precioNumero,
        }),
      });

      if (!r.ok) {
        throw new Error('El servidor no pudo crear el producto');
      }

      setNombre('');
      setPrecio('');
      await cargarProductos();
    } catch (err: any) {
      setError(err?.message || 'Error al guardar producto');
    } finally {
      setGuardando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>🛒 Mini tienda</Text>

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Nuevo Producto</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del producto (ej: Ratón gamer)"
          placeholderTextColor="#94A3B8"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Precio en € (ej: 25)"
          placeholderTextColor="#94A3B8"
          value={precio}
          onChangeText={setPrecio}
          keyboardType="numeric"
        />

        {guardando ? (
          <ActivityIndicator color="#2563EB" style={styles.loader} />
        ) : (
          <Button
            title="Añadir producto"
            onPress={crearProducto}
            color="#2563EB"
          />
        )}
      </View>

      {error && <Text style={styles.errorText}>⚠️ {error}</Text>}

      <Text style={styles.subtitle}>Catálogo disponible</Text>

      {cargando && productos.length === 0 ? (
        <ActivityIndicator size="large" color="#2563EB" style={styles.loader} />
      ) : (
        <FlatList
          data={productos}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.nombre}</Text>
                <Text style={styles.productId}>ID #{item.id}</Text>
              </View>
              <Text style={styles.productPrice}>{item.precio} €</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F8FAFC',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
    marginTop: 20,
    marginBottom: 10,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  formTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 15,
    backgroundColor: '#F8FAFC',
  },
  loader: {
    marginVertical: 10,
  },
  errorText: {
    color: '#DC2626',
    marginVertical: 10,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    padding: 16,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  productId: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  productPrice: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2563EB',
  },
});
