# EJERCICIO 04 - Filtra Videojuegos (@Query, @Param y filter)

## Qué he aprendido
- **`@Query`, `@Param` y `filter()`**:
  - Captura y lectura de parámetros de consulta (*query parameters*) utilizando `@Get()` con `@Query('genero') genero?: string`, permitiendo filtros opcionales como `GET /juegos?genero=FPS`.
  - Captura de parámetros dinámicos de ruta (*route parameters*) mediante `@Get(':genero')` con `@Param('genero') genero: string` para rutas como `GET /juegos/moba`.
  - Diferencia esencial entre `find()` y `filter()`: mientras que `find()` se detiene y devuelve el primer elemento coincidente (o `undefined`), `filter()` recorre toda la colección y retorna un nuevo array con todos los elementos que satisfagan la condición (o un array vacío `[]` si ninguno coincide).
  - Normalización de cadenas de texto con `toLowerCase()` para garantizar que las búsquedas y filtros sean insensibles a mayúsculas y minúsculas (*case-insensitive*), mejorando la tolerancia ante entradas del usuario.
- **Cómo encaja en el recorrido Full Stack**:
  - En aplicaciones móviles (React Native) o web modernas, los listados de datos frecuentemente integran barras de búsqueda, selectores desplegables o chips de categorías (ej. "FPS", "MOBA", "Sandbox"). Al seleccionar un filtro, el frontend emite una petición `GET` enviando el criterio deseado a la API. El backend procesa el filtro y entrega exactamente los registros requeridos, reduciendo la transferencia de datos y la sobrecarga de renderizado en el cliente.
- **Cómo modificar un ejemplo funcional sin empezar desde cero**:
  - Modelar estructuras de datos robustas mediante interfaces TypeScript (`Juego`), tipar colecciones en memoria (`Juego[]`) y desacoplar la lógica de filtrado en el servicio inyectado (`JuegosService`), manteniendo el controlador limpio y enfocado en la gestión de peticiones HTTP.

---

## Respuesta a la pregunta de comprensión
> **¿Podrías explicar este ejercicio sin mirar el código?**

Este ejercicio implementa el filtrado de una colección de recursos según un criterio especificado por el cliente.

Podemos entenderlo con la metáfora de un **videoclub o tienda especializada de videojuegos**:
1. **La Petición con Criterio de Búsqueda:** El cliente (la app móvil o el navegador) no solicita el catálogo completo ni tampoco un único juego por su código de barras (como en el ejercicio anterior). En este caso, el cliente se acerca al mostrador pidiendo ver los títulos de una categoría o género concreto: *"Muéstrame todos los videojuegos que tengáis del género FPS"*.
2. **El Controlador (Atención en Mostrador):** El controlador (`JuegosController`) recibe la consulta en la ruta `/juegos`. Extrae el parámetro de filtrado que el usuario indicó (ya sea como query param en `/juegos?genero=FPS` o en la ruta `/juegos/FPS`) y se lo traslada al almacenero diciendo: *"Fíltramelos por el género recibido"*.
3. **El Servicio (El Almacén y la Criba con `filter`):** El servicio (`JuegosService`) posee la colección completa en memoria. En lugar de detenerse al encontrar el primero (`find`), aplica una criba o colador (`filter()`) recorriendo todo el inventario y seleccionando **todos** aquellos videojuegos cuyo género coincida (ignorando diferencias de mayúsculas). Si el cliente no indicó ningún filtro, le entrega directamente el catálogo completo.
4. **La Respuesta:** El servicio devuelve el subconjunto de videojuegos al controlador, y este lo responde al cliente en formato JSON con código `200 OK`. Si ningún juego coincide con el género solicitado, devuelve un array vacío `[]`, permitiendo que la interfaz móvil muestre amistosamente un mensaje de *"No se encontraron videojuegos en esta categoría"*.

---

## Qué he modificado
- En [juegos.controller.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-04/backend/src/juegos/juegos.controller.ts):
  - Inyección del servicio `JuegosService` en el constructor.
  - Implementación del endpoint `@Get()` con `@Query('genero') genero?: string` para soportar tanto la obtención completa del catálogo (`GET /juegos`) como el filtrado por query parameter (`GET /juegos?genero=...`).
  - Implementación del endpoint `@Get(':genero')` con `@Param('genero') genero: string` para dar soporte a consultas directas por segmento de ruta (`GET /juegos/:genero`).
- En [juegos.service.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-04/backend/src/juegos/juegos.service.ts):
  - Definición de la interfaz `Juego` (`id`, `titulo`, `genero`, `anio`).
  - Declaración del array privado tipado `juegos: Juego[]` con 5 videojuegos representativos de diversos géneros (MOBA, Sandbox, Acción-aventura, FPS, Social-deduction).
  - Implementación del método `findAll(genero?: string)`: si recibe un género, aplica `filter()` con normalización en minúsculas (`toLowerCase()`); si no se proporciona, retorna la lista completa.
- En [juegos.controller.spec.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-04/backend/src/juegos/juegos.controller.spec.ts):
  - Inclusión de `JuegosService` en el arreglo de `providers` del módulo de pruebas unitarias para resolver la inyección de dependencias en los tests automatizados con Vitest.

---

## Resultado

### 1. Obtener catálogo completo
**Petición**: `GET http://localhost:3000/juegos`
- **Estado**: `200 OK`
- **Respuesta (JSON)**:
```json
[
  {
    "id": 1,
    "titulo": "League of Legends",
    "genero": "MOBA",
    "anio": 2009
  },
  {
    "id": 2,
    "titulo": "Minecraft",
    "genero": "Sandbox",
    "anio": 2011
  },
  {
    "id": 3,
    "titulo": "Grand Theft Auto V",
    "genero": "Acción-aventura",
    "anio": 2013
  },
  {
    "id": 4,
    "titulo": "Valorant",
    "genero": "FPS",
    "anio": 2020
  },
  {
    "id": 5,
    "titulo": "Among Us",
    "genero": "Social-deduction",
    "anio": 2018
  }
]
```

### 2. Filtrar por Query Parameter
**Petición**: `GET http://localhost:3000/juegos?genero=FPS`
- **Estado**: `200 OK`
- **Respuesta (JSON)**:
```json
[
  {
    "id": 4,
    "titulo": "Valorant",
    "genero": "FPS",
    "anio": 2020
  }
]
```

### 3. Filtrar por Parámetro de Ruta
**Petición**: `GET http://localhost:3000/juegos/moba`
- **Estado**: `200 OK`
- **Respuesta (JSON)**:
```json
[
  {
    "id": 1,
    "titulo": "League of Legends",
    "genero": "MOBA",
    "anio": 2009
  }
]
```

### 4. Filtrado sin coincidencias
**Petición**: `GET http://localhost:3000/juegos?genero=carreras`
- **Estado**: `200 OK`
- **Respuesta (JSON)**:
```json
[]
```
