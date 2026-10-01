# EJERCICIO 12 - Creature Lab (Integración Full Stack Completa)

## Qué he aprendido
- **El viaje completo del dato en una arquitectura Full Stack**:
  - Dominio y comprensión del flujo integral sin intermediarios ocultos:
    $$\text{React Native} \longrightarrow \text{fetch()} \longrightarrow \text{Controller} \longrightarrow \text{Service} \longrightarrow \text{Array en memoria} \longrightarrow \text{JSON} \longrightarrow \text{useState} \longrightarrow \text{Interfaz}$$
- **Coordinación de múltiples endpoints y verbos HTTP**:
  - `GET /criaturas`: Consulta de colección completa para alimentar la lista horizontal de selección.
  - `GET /criaturas/:id`: Consulta puntual por parámetro de ruta (`@Param`) para obtener la ficha detallada de la criatura activa.
  - `PATCH /criaturas/:id/like`: Mutación atómica y parcial de datos sobre el recurso seleccionado.
- **Patrón Maestro-Detalle sincronizado en React Native**:
  - Mantenimiento coordinado de dos estados interdependientes: la colección global `criaturas` y la criatura en foco `seleccionada`.
  - Al recibir la respuesta del `PATCH`, actualización instantánea tanto de la tarjeta principal (*Hero Card*) como del elemento correspondiente en el carrusel horizontal sin provocar recargas innecesarias ni desalineaciones de datos.
- **Diseño de interfaz móvil enriquecida**:
  - Integración de `<FlatList horizontal>` con renderizado personalizado mediante `<Pressable>`.
  - Estados visuales de selección activa (`isSelected`), indicadores de actividad (`ActivityIndicator`) y transiciones de diseño limpias.

---

## Respuesta a la pregunta de comprensión
> **¿Podrías explicar el viaje completo de un dato sin mirar el código?**
>
> Imagina un **laboratorio interactivo de criaturas fantásticas**:
> 
> 1. **La Llegada al Laboratorio (Carga Inicial):**
>    - Al abrir la aplicación en el móvil, la pantalla emite una petición general a la central: *"Dame el censo de todas las criaturas disponibles"* (`GET /criaturas`).
>    - En NestJS, el `CriaturasController` recibe la solicitud y le pide la lista al `CriaturasService`. El servicio acude a su fichero en memoria y devuelve a Draco 🐲, Foxy 🦊 y Panda-X 🐼.
>    - Los datos viajan por la red como un paquete de texto estructurado en JSON.
>    - La app móvil recoge ese JSON, ejecuta `setCriaturas` y dibuja un carrusel horizontal con los avatares. Draco se coloca automáticamente en el pedestal central de exhibición.
>
> 2. **El Cambio de Criatura (Consulta Detallada):**
>    - El usuario toca a Panda-X en el carrusel.
>    - La app detecta el toque y lanza una petición específica: *"Tráeme el informe detallado de la criatura número 3"* (`GET /criaturas/3`).
>    - El controlador de NestJS extrae el `3` de la dirección con `@Param('id')`, el servicio lo busca con `find()` y responde con su informe (Nivel 15, Poder 73, 22 likes).
>    - La aplicación recibe el paquete, actualiza `setSeleccionada` y el pedestal principal se redibuja con las estadísticas de Panda-X.
>
> 3. **La Interacción de Apoyo (Mutación Parcial):**
>    - El usuario pulsa el botón *"❤️ Me gusta"*.
>    - La app manda una orden de modificación directa: *"Añade un like a la criatura 3"* (`PATCH /criaturas/3/like`).
>    - El controlador de NestJS procesa la orden y el servicio incrementa el contador (`criatura.likes++`), pasando de 22 a 23.
>    - El servidor devuelve la ficha con el nuevo número. La aplicación actualiza el pedestal y la tarjeta del carrusel con el nuevo contador.
>
> 4. **La Naturaleza Volátil:**
>    - Si el servidor se apaga o reinicia, la pizarra en memoria RAM se borra y las criaturas recuperan sus valores de fábrica, demostrando la función pedagógica del array temporal antes de dar el salto a una base de datos persistente.

---

## Qué he modificado

### Backend (NestJS)
- En [main.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-12/backend/src/main.ts):
  - Habilitación de CORS mediante `app.enableCors()`.
- En [criaturas.service.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-12/backend/src/criaturas/criaturas.service.ts):
  - Definición del modelo `Criatura` (`id`, `nombre`, `nivel`, `poder`, `likes`, `emoji`).
  - Array en memoria con Draco (id: 1, nivel: 18, poder: 82, likes: 27), Foxy (id: 2, nivel: 12, poder: 68, likes: 19) y Panda-X (id: 3, nivel: 15, poder: 73, likes: 22).
  - Métodos `findAll()`, `findOne(id)` y `darLike(id)`.
- En [criaturas.controller.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-12/backend/src/criaturas/criaturas.controller.ts):
  - Endpoints `@Get()`, `@Get(':id')` y `@Patch(':id/like')`.
  - Manejo de excepciones `NotFoundException` ante IDs no encontrados.
- En [app.module.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-12/backend/src/app.module.ts):
  - Declaración y registro de `CriaturasController` y `CriaturasService`.

### Frontend (React Native con Expo)
- En [App.tsx](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-12/frontend/App.tsx):
  - Constante de conexión `API_URL = 'http://10.119.79.225:3000'`.
  - Estados para `criaturas`, `seleccionada`, `cargando`, `dandoLike` y `error`.
  - Función `cargarCriaturas()` invocada al inicio con `useEffect` que carga el catálogo y preselecciona la primera criatura.
  - Función `seleccionar(id)` que solicita los datos individuales de la criatura elegida.
  - Función `darLike()` que ejecuta `PATCH /criaturas/:id/like` y sincroniza en tiempo real tanto la vista de detalle como el carrusel.
  - Maquetación con tarjeta hero para la criatura activa y carrusel horizontal interactivo con feedback táctil.

---

## Resultado

### 1. Comprobación de la API (Backend)
```bash
# 1. Obtener todas las criaturas
curl -X GET http://localhost:3000/criaturas
# Devuelve el array con Draco, Foxy y Panda-X

# 2. Consultar criatura específica
curl -X GET http://localhost:3000/criaturas/2
# Respuesta: {"id":2,"nombre":"Foxy","nivel":12,"poder":68,"likes":19,"emoji":"🦊"}

# 3. Dar like a Foxy
curl -X PATCH http://localhost:3000/criaturas/2/like
# Respuesta: {"id":2,"nombre":"Foxy","nivel":12,"poder":68,"likes":20,"emoji":"🦊"}
```

### 2. Comportamiento en la Aplicación Móvil
```
┌──────────────────────────────────────────────┐
│  🧪 Creature Lab                             │
│  Integración Full Stack React Native + Nest  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │                  🦊                    │  │
│  │                 Foxy                   │  │
│  │         Nivel 12 · Poder 68            │  │
│  │             ❤️ 20 likes                │  │
│  │                                        │  │
│  │           [ ❤️ Me gusta ]              │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  Elige tu Criatura                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │    🐲    │  │    🦊    │  │    🐼    │    │
│  │  Draco   │  │  *Foxy*  │  │ Panda-X  │    │
│  │  ❤️ 27   │  │  ❤️ 20   │  │  ❤️ 22   │    │
│  └──────────┘  └──────────┘  └──────────┘    │
└──────────────────────────────────────────────┘
```
1. Al cargar la app, se consumen las criaturas desde NestJS y se muestran en el carrusel y en la tarjeta destacada.
2. Al pulsar cualquier criatura del carrusel, se lanza `GET /criaturas/:id` y el pedestal se actualiza con sus estadísticas.
3. Al pulsar *"❤️ Me gusta"*, se emite `PATCH /criaturas/:id/like`, el backend incrementa la cifra en su array y el cliente actualiza el contador de inmediato.
