# EJERCICIO 09 - Busca Superhéroe (Petición Dinámica por Path Param)

## Qué he aprendido
- **Construcción de URLs dinámicas desde el cliente móvil**:
  - Captura de entradas numéricas de usuario mediante `<TextInput keyboardType="numeric" value={id} onChangeText={setId} />`.
  - Composición dinámica de rutas concatenando el estado en la petición HTTP: `fetch(API_URL + '/heroes/' + id)`.
  - Integración del concepto de Path Parameter visto en el backend con su origen real en una interfaz móvil.
- **Gestión de respuestas individuales y manejo de errores (404 Not Found)**:
  - Manejo de objetos individuales en el estado (`useState<Heroe | null>(null)`).
  - Comprobación del código de respuesta con `respuesta.ok` y renderizado condicional de mensajes de error (*"Héroe no encontrado"*) cuando el recurso solicitado no existe.
- **Cómo encaja en el recorrido Full Stack**:
  - Cierra la conexión entre la entrada de usuario en el frontend y el endpoint parametrizado `@Get(':id')` del backend: un dato introducido en un campo de texto viaja por la URL hasta el controlador de NestJS y retorna la ficha concreta del recurso para su visualización.
- **Cómo modificar un ejemplo funcional sin empezar desde cero**:
  - Definir la colección de héroes en el servicio con atributos enriquecidos (`nombre`, `poder`, `universo`), maquetar la tarjeta de presentación (*ficha de superhéroe*) y validar la existencia del identificador consultado.

---

## Respuesta a la pregunta de comprensión
> **¿Podrías explicar este ejercicio sin mirar el código?**

Este ejercicio implementa la búsqueda puntual de un elemento concreto donde el identificador nace de la interacción del usuario en la app móvil.

Podemos entenderlo con la metáfora de **la consulta del expediente de un superhéroe en los archivos centrales**:
1. **El Usuario y el Formulario:** El usuario escribe el número de expediente *"2"* en la casilla de texto de la aplicación móvil.
2. **La Llamada Dinámica:** Al pulsar el botón *"Buscar"*, la app no pide ver a todos los héroes ni una dirección fija; ensambla la URL dinámica pegando el número introducido: `GET /heroes/2`.
3. **La Recepción en la Oficina Central (`@Param`):** En NestJS, el controlador tiene una ventana configurada para leer ese número en el path (`@Get(':id')` y `@Param('id')`). Extrae el número `"2"`, lo convierte a número y le dice al servicio: *"Localiza el héroe con ID 2"*.
4. **La Búsqueda y la Ficha:** El servicio busca en su lista con `find()`. Si lo encuentra, devuelve su ficha en JSON. La app móvil guarda el objeto en su estado (`setHeroe`), dibujando en pantalla la ficha técnica del héroe con su nombre, poder y universo. Si no existe, informa de que no se ha encontrado el expediente.

> **Sigue el valor `id` desde React Native hasta `@Param('id')`. ¿Por dónde pasa?**
> El recorrido paso a paso es:
> 1. **React Native (Estado):** El usuario escribe `"2"` en el `TextInput` y `onChangeText` actualiza el estado local `id`.
> 2. **React Native (Petición):** Al pulsar *"Buscar"*, la función `buscarHeroe()` concatena el valor en la URL: `fetch(API_URL + '/heroes/' + id)`.
> 3. **Red (HTTP):** La petición viaja como `GET http://<IP>:3000/heroes/2`.
> 4. **NestJS (Ruta):** El enrutador de NestJS reconoce el patrón `@Get(':id')`.
> 5. **NestJS (Controlador):** El decorador `@Param('id') id: string` extrae `"2"` de la URL como argumento.
> 6. **NestJS (Servicio):** El método convierte el valor con `Number(id)` y busca la coincidencia exacta en el array en memoria.

---

## Qué he modificado

### Backend (NestJS)
- En [main.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-09/backend/src/main.ts):
  - Habilitación de CORS con `app.enableCors()`.
- En [heroes.service.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-09/backend/src/heroes/heroes.service.ts):
  - Definición de la interfaz `Heroe` (`id`, `nombre`, `poder`, `universo`).
  - Declaración del array privado `heroes` con 3 superhéroes (Nova, Titan, Volt).
  - Implementación de `findOne(id: number)` lanzando `NotFoundException` si el héroe no existe.
- En [heroes.controller.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-09/backend/src/heroes/heroes.controller.ts):
  - Endpoint dinámico `@Get(':id')` utilizando `@Param('id')`.
- En [app.module.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-09/backend/src/app.module.ts):
  - Registro de `HeroesController` y `HeroesService`.

### Frontend (React Native con Expo)
- En [App.tsx](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-09/frontend/App.tsx):
  - Estados `id`, `heroe` y `error`.
  - Entrada de texto numérica con `<TextInput keyboardType="numeric" />`.
  - Función `buscarHeroe()` que concatena el `id` en la petición y gestiona errores HTTP.
  - Renderizado condicional de la tarjeta con nombre, poder y universo del héroe.

---

## Resultado

### 1. Petición al Backend
**Petición**: `GET http://localhost:3000/heroes/1`
- **Estado**: `200 OK`
- **Respuesta (JSON)**:
```json
{
  "id": 1,
  "nombre": "Nova",
  "poder": 80,
  "universo": "A"
}
```

**Petición con ID inexistente**: `GET http://localhost:3000/heroes/99`
- **Estado**: `404 Not Found`
- **Respuesta (JSON)**:
```json
{
  "message": "Héroe con ID 99 no encontrado",
  "error": "Not Found",
  "statusCode": 404
}
```

### 2. Flujo en la Aplicación Móvil
1. **Búsqueda exitosa (ID = 2)**: Al pulsar "Buscar", la app renderiza una tarjeta con:
   - **Titan**
   - ⚡ Poder: 95
   - 🌌 Universo: B
2. **Búsqueda fallida (ID = 99)**: La app borra la ficha anterior y muestra en rojo el mensaje `"Héroe no encontrado"`.
