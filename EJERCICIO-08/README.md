# EJERCICIO 08 - Menú del Restaurante (FlatList y Arrays)

## Qué he aprendido
- **El componente `FlatList` en React Native**:
  - Renderizado eficiente de colecciones y listas de datos mediante el componente nativo `FlatList`.
  - La propiedad `data={productos}`: conexión entre el array de datos guardado en el estado (`useState<Producto[]>([])`) y el motor de renderizado de la lista.
  - La propiedad `keyExtractor`: definición de una clave única y estable para cada elemento del array (`(item) => String(item.id)`), optimizando la reconciliación y el reciclaje de vistas en React.
  - La función `renderItem`: función encargada de mapear cada objeto del array a una estructura de componentes visuales (tarjetas con emoji, nombre y precio formateado).
- **Consumo de colecciones completas desde el backend**:
  - En lugar de recibir un mensaje plano o un único valor, el frontend consume un array estructurado de objetos JSON tipados (`Producto[]`) desde el endpoint `GET /productos`.
- **Cómo encaja en el recorrido Full Stack**:
  - Representa el patrón estándar de **listado de catálogo**: el backend gestiona y expone el inventario en el servicio (`ProductosService`), y el frontend móvil descarga la lista en el montaje (`useEffect`) y la presenta de manera dinámica en tarjetas mediante `FlatList`.
- **Cómo modificar un ejemplo funcional sin empezar desde cero**:
  - Añadir nuevos elementos al array en memoria del backend (como el cuarto producto `Sushi 🍣` a 14.0 €) y maquetar cada fila como una tarjeta estilizada con flexbox (`flexDirection: 'row'`).

---

## Respuesta a la pregunta de comprensión
> **¿Podrías explicar este ejercicio sin mirar el código?**

Este ejercicio implementa la representación en lista de una colección completa de datos proveniente del servidor.

Podemos entenderlo con la metáfora de **la comanda y la carta visual de un restaurante**:
1. **La Carta en la Cocina (El Service en NestJS):** En la cocina del restaurante (`ProductosService`), los cocineros tienen una lista de platos con sus ingredientes, precios y emojis. El controlador (`ProductosController`) expone esa carta al público en la ruta `GET /productos`.
2. **La Petición del Cliente Móvil (`fetch`):** Nada más abrir la aplicación móvil, `useEffect` pide la carta completa al restaurante.
3. **El Almacén Local (`useState`):** La app recibe el array de productos en JSON y lo guarda en su estado reactivo (`productos`).
4. **El Maquetador de Tarjetas (`FlatList`):** En lugar de dibujar a mano cada plato con código repetido, se le entrega la lista completa a `FlatList` (`data={productos}`). `FlatList` recorre cada plato uno a uno y, siguiendo el molde de `renderItem`, genera una tarjeta estilizada en pantalla con el emoji a la izquierda y el nombre y precio a la derecha.

> **¿Qué relación existe entre el array del Service y `data={productos}`?**
> El array del Service es la **fuente de verdad** en el servidor (el catálogo de datos). El cliente obtiene una copia de ese array mediante HTTP, la guarda en su estado `productos` y se la pasa a la propiedad `data` de `FlatList`. Por tanto, `data` es el receptor en el frontend del mismo conjunto de datos que reside en el Service del backend.

---

## Qué he modificado

### Backend (NestJS)
- En [main.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-08/backend/src/main.ts):
  - Habilitación de CORS con `app.enableCors()`.
- En [productos.service.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-08/backend/src/productos/productos.service.ts):
  - Definición de la interfaz `Producto` (`id`, `nombre`, `precio`, `emoji`).
  - Declaración del array privado `productos` incluyendo un cuarto producto (`Sushi 🍣`, 14.0 €).
  - Implementación del método `findAll()`.
- En [productos.controller.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-08/backend/src/productos/productos.controller.ts):
  - Inyección de `ProductosService` y exposición del endpoint `@Get()`.
- En [app.module.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-08/backend/src/app.module.ts):
  - Registro de `ProductosController` y `ProductosService`.

### Frontend (React Native con Expo)
- En [App.tsx](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-08/frontend/App.tsx):
  - Tipado con TypeScript `type Producto`.
  - Carga asíncrona mediante `fetch(API_URL + '/productos')` en `useEffect`.
  - Renderizado mediante `FlatList` con `keyExtractor` y diseño de tarjetas (`card`) con sombra, borde, emoji y precio destacado en azul.

---

## Resultado

### 1. Petición al Backend
**Petición**: `GET http://localhost:3000/productos`
- **Estado**: `200 OK`
- **Respuesta (JSON)**:
```json
[
  {
    "id": 1,
    "nombre": "Burger",
    "precio": 9.95,
    "emoji": "🍔"
  },
  {
    "id": 2,
    "nombre": "Pizza",
    "precio": 11.5,
    "emoji": "🍕"
  },
  {
    "id": 3,
    "nombre": "Taco",
    "precio": 7.5,
    "emoji": "🌮"
  },
  {
    "id": 4,
    "nombre": "Sushi",
    "precio": 14,
    "emoji": "🍣"
  }
]
```

### 2. Flujo en la Aplicación Móvil
- Al abrir la app se realiza la petición automática al backend.
- La pantalla muestra el encabezado `"🍴 Food Lab"`.
- Los 4 productos se visualizan verticalmente como tarjetas independientes con diseño limpio y tipografía cuidada.
