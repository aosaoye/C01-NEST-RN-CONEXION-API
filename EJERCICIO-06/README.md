# EJERCICIO 06 - Estado de Conexión (useState)

## Qué he aprendido
- **Estado en React y hook `useState`**:
  - Declaración y uso de variables de estado reactivo mediante `const [mensaje, setMensaje] = useState('🔴 Sin conectar')`.
  - Comprender la función actualizadora `setMensaje()`: React no detecta cambios en variables tradicionales de JavaScript; al invocar la función de actualización del hook, React registra el cambio y desencadena un nuevo renderizado de la vista de forma eficiente.
  - Indicadores visuales de estado: definir un valor inicial previo a la conexión (`🔴 Sin conectar`) y mutarlo tras recibir la confirmación de la API (`🟢 ¡Conexión conseguida!`), mejorando notablemente la experiencia de usuario (UX).
- **Consumo de endpoints desde React Native**:
  - Conectar una acción explícita del usuario (botón `<Button title="Conectar" onPress={cargarMensaje} />`) con una función asíncrona que ejecuta `fetch()`.
  - Deserialización de la respuesta JSON (`await respuesta.json()`) y extracción de propiedades específicas (`datos.texto`).
- **Cómo encaja en el recorrido Full Stack**:
  - En una arquitectura cliente-servidor, los datos recibidos desde la red no alteran la interfaz por sí mismos. `useState` actúa como el **puente reactivo** entre la respuesta de la API (`fetch`) y la interfaz visual del dispositivo (`Text`).
- **Cómo modificar un ejemplo funcional sin empezar desde cero**:
  - Construir un controlador limpio en NestJS (`MensajeController`), habilitar CORS y estructurar una pantalla en React Native con gestión de errores mediante `try/catch`.

---

## Respuesta a la pregunta de comprensión
> **¿Podrías explicar este ejercicio sin mirar el código?**

Este ejercicio implementa la reactividad en el cliente móvil para reflejar los datos que llegan desde el servidor.

Podemos entenderlo con la metáfora de **la pizarra de avisos de un puesto de control**:
1. **El Estado Inicial:** Antes de iniciar la comunicación, la pizarra del operador móvil muestra una tarjeta roja: *"🔴 Sin conectar"*. Esta información vive en la memoria reactiva del componente (`useState`).
2. **La Acción:** El operador pulsa el botón *"Conectar"*. Esto dispara una orden (`fetch`) hacia el backend de NestJS en la ruta `/mensaje`.
3. **La Respuesta del Servidor:** El servidor procesa la solicitud `GET` y responde con el paquete `{ "texto": "¡Conexión conseguida!" }`.
4. **La Actualización Reactiva:** Si usáramos una variable estándar de JavaScript, el texto cambiaría en la memoria del programa pero la pantalla seguiría idéntica. Gracias a la función actualizadora de `useState`, el teléfono borra automáticamente la pizarra anterior y dibuja la nueva tarjeta verde: *"🟢 ¡Conexión conseguida!"*.

> **¿Qué aporta `useState` frente a una variable normal?**
> Una variable normal de JavaScript solo conserva el valor en memoria; si su contenido cambia, React no se entera y la pantalla permanece congelada. `useState` aporta **reactividad**: cuando se llama a su función actualizadora (`setMensaje`), React vuelve a ejecutar el renderizado del componente para refrescar inmediatamente la interfaz con el nuevo dato en pantalla.

---

## Qué he modificado

### Backend (NestJS)
- En [main.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-06/backend/src/main.ts):
  - Habilitación de CORS con `app.enableCors()`.
- En [mensaje.controller.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-06/backend/src/mensaje/mensaje.controller.ts):
  - Definición del controlador `MensajeController` bajo la ruta `/mensaje`.
  - Método `obtenerMensaje()` con `@Get()` devolviendo `{ texto: '¡Conexión conseguida!' }`.
- En [app.module.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-06/backend/src/app.module.ts):
  - Registro de `MensajeController` en el módulo raíz.

### Frontend (React Native con Expo)
- En [App.tsx](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-06/frontend/App.tsx):
  - Creación del estado con `useState('🔴 Sin conectar')`.
  - Función `cargarMensaje()` que consume la API con `fetch()` y actualiza el estado a `🟢 ¡Conexión conseguida!`.
  - Botón de conexión y layout centrado con `SafeAreaView` y `StatusBar`.

---

## Resultado

### 1. Petición al Backend
**Petición**: `GET http://localhost:3000/mensaje`
- **Estado**: `200 OK`
- **Respuesta (JSON)**:
```json
{
  "texto": "¡Conexión conseguida!"
}
```

### 2. Flujo en la Aplicación Móvil
1. **Estado Inicial**: Se muestra en pantalla `"🔴 Sin conectar"` junto al botón `"Conectar"`.
2. **Tras pulsar el botón**: La app realiza la llamada HTTP a NestJS, recibe la respuesta JSON y el estado muta reactivamente a `"🟢 ¡Conexión conseguida!"`.
