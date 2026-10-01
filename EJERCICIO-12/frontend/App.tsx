import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const API_URL = 'http://10.119.79.225:3000';

type Criatura = {
  id: number;
  nombre: string;
  nivel: number;
  poder: number;
  likes: number;
  emoji: string;
};

export default function App() {
  const [criaturas, setCriaturas] = useState<Criatura[]>([]);
  const [seleccionada, setSeleccionada] = useState<Criatura | null>(null);
  const [cargando, setCargando] = useState<boolean>(false);
  const [dandoLike, setDandoLike] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const cargarCriaturas = async () => {
    try {
      setCargando(true);
      setError(null);
      const r = await fetch(API_URL + '/criaturas');
      if (!r.ok) {
        throw new Error('Error al cargar criaturas');
      }
      const datos: Criatura[] = await r.json();
      setCriaturas(datos);

      // Si no hay seleccionada previa, seleccionar la primera
      if (datos.length > 0 && !seleccionada) {
        setSeleccionada(datos[0]);
      }
    } catch (err: any) {
      setError(err?.message || 'Error de conexión');
    } finally {
      setCargando(false);
    }
  };

  const seleccionar = async (id: number) => {
    try {
      setError(null);
      const r = await fetch(API_URL + '/criaturas/' + id);
      if (!r.ok) {
        throw new Error('No se pudo encontrar la criatura');
      }
      const datos: Criatura = await r.json();
      setSeleccionada(datos);
    } catch (err: any) {
      setError(err?.message || 'Error al obtener detalle');
    }
  };

  const darLike = async () => {
    if (!seleccionada || dandoLike) return;

    try {
      setDandoLike(true);
      setError(null);
      const r = await fetch(
        API_URL + '/criaturas/' + seleccionada.id + '/like',
        { method: 'PATCH' }
      );
      if (!r.ok) {
        throw new Error('Error al incrementar like');
      }
      const actualizada: Criatura = await r.json();
      setSeleccionada(actualizada);

      // Sincronizar en el listado horizontal local
      setCriaturas((prev) =>
        prev.map((c) => (c.id === actualizada.id ? actualizada : c))
      );
    } catch (err: any) {
      setError(err?.message || 'Error al dar like');
    } finally {
      setDandoLike(false);
    }
  };

  useEffect(() => {
    cargarCriaturas();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>🧪 Creature Lab</Text>
      <Text style={styles.subtitle}>Integración Full Stack React Native + NestJS</Text>

      {error && <Text style={styles.errorText}>⚠️ {error}</Text>}

      {cargando && !seleccionada ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Conectando con la API...</Text>
        </View>
      ) : (
        <>
          {seleccionada && (
            <View style={styles.hero}>
              <Text style={styles.emoji}>{seleccionada.emoji}</Text>
              <Text style={styles.name}>{seleccionada.nombre}</Text>
              <Text style={styles.stats}>
                Nivel {seleccionada.nivel} · Poder {seleccionada.poder}
              </Text>
              <Text style={styles.likes}>❤️ {seleccionada.likes} likes</Text>

              <Pressable
                style={[styles.likeButton, dandoLike && styles.likeButtonDisabled]}
                onPress={darLike}
                disabled={dandoLike}
              >
                {dandoLike ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.likeButtonText}>❤️ Me gusta</Text>
                )}
              </Pressable>
            </View>
          )}

          <Text style={styles.sectionHeader}>Elige tu Criatura</Text>
          <FlatList
            data={criaturas}
            keyExtractor={(item) => String(item.id)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carousel}
            renderItem={({ item }) => {
              const isSelected = seleccionada?.id === item.id;
              return (
                <Pressable
                  style={[styles.item, isSelected && styles.itemSelected]}
                  onPress={() => seleccionar(item.id)}
                >
                  <Text style={styles.itemEmoji}>{item.emoji}</Text>
                  <Text
                    style={[
                      styles.itemName,
                      isSelected && styles.itemNameSelected,
                    ]}
                  >
                    {item.nombre}
                  </Text>
                  <Text style={styles.itemLikes}>❤️ {item.likes}</Text>
                </Pressable>
              );
            }}
          />
        </>
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
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#64748B',
    fontSize: 14,
  },
  hero: {
    padding: 24,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  emoji: {
    fontSize: 72,
    marginBottom: 6,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },
  stats: {
    fontSize: 14,
    color: '#475569',
    marginTop: 4,
    fontWeight: '500',
  },
  likes: {
    fontSize: 20,
    fontWeight: '700',
    color: '#DC2626',
    marginVertical: 14,
  },
  likeButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
    minWidth: 140,
    alignItems: 'center',
  },
  likeButtonDisabled: {
    opacity: 0.7,
  },
  likeButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 12,
  },
  carousel: {
    paddingVertical: 6,
    gap: 12,
  },
  item: {
    width: 105,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  itemSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
    transform: [{ scale: 1.03 }],
  },
  itemEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  itemNameSelected: {
    color: '#2563EB',
    fontWeight: '700',
  },
  itemLikes: {
    fontSize: 12,
    color: '#DC2626',
    marginTop: 4,
    fontWeight: '600',
  },
  errorText: {
    color: '#DC2626',
    marginBottom: 12,
    fontSize: 13,
  },
});
