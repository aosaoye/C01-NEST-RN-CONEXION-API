# EJERCICIO 07 - Carga Automática (useEffect)

## Qué he aprendido
- **El hook `useEffect` y el ciclo de vida en React**:
  - Ejecución de efectos secundarios en el montaje del componente mediante `useEffect(() => { cargarMensaje(); }, [])`.
  - El array de dependencias vacío `[]`: garantiza que la petición HTTP se ejecute exactamente una vez cuando el componente se monta en la pantalla, evitando bucles infinitos de peticiones.
  - Gestión de estados de transición: inicializar el estado en `'Cargando…'` para informar al usuario de que la comunicación con la API está en curso mientras se resuelve la promesa de red.
  - Combinación de carga inicial automática con acciones bajo demanda: mantener un botón `<Button title="Recargar" onPress={cargarMensaje} />` que permite refrescar los datos sin reiniciar la app.
- **Cómo encaja en el recorrido Full Stack**:
  - En aplicaciones móviles profesionales, las pantallas no esperan a que el usuario pulse un botón para solicitar sus datos; la petición se dispara automáticamente en segundo plano en cuanto se navega a la pantalla (`useEffect`), transformando la experiencia de usuario en algo fluido e inmediato.
- **Cómo modificar un ejemplo funcional sin empezar desde cero**:
  - Mantener el contrato del backend (`GET /mensaje`) con el mensaje actualizado `{ texto: 'Backend disponible' }`, adaptando el frontend para incorporar el hook `useEffect` sin perder la capacidad de recarga manual.

---

## Respuesta a la pregunta de comprensión
> **¿Podrías explicar este ejercicio sin mirar el código?**

Este ejercicio implementa la carga desasistida o automática de datos en la app móvil.

Podemos entenderlo con la metáfora de **abrir un periódico matutino**:
1. **El Montaje (Aparece la Pantalla):** En cuanto el usuario abre la aplicación móvil, el componente se dibuja por primera vez. De entrada, muestra un estado transitorio: *"Cargando…"*.
2. **El Disparador Automático (`useEffect`):** Sin esperar a que el usuario toque la pantalla, el sensor de montaje (`useEffect`) detecta que la vista acaba de nacer y lanza inmediatamente la llamada HTTP (`fetch`) al backend de NestJS en la ruta `/mensaje`.
3. **La Respuesta y la Reactividad:** El backend entrega `{ "texto": "Backend disponible" }`. El hook actualizador `setMensaje` sustituye el texto de carga por *"🟢 Backend disponible"*.
4. **La Recarga Opcional:** Si el usuario desea verificar de nuevo el estado sin cerrar la app, pulsa el botón *"Recargar"*, que vuelve a llamar a la misma función reutilizable `cargarMensaje()`.

> **¿Qué diferencia hay entre llamar a `cargarMensaje` desde un botón y desde `useEffect`?**
> La llamada desde un botón es **manual** y depende de un evento de usuario (`onPress`), por lo que la pantalla nace vacía o sin conectar hasta que el usuario interactúa. La llamada desde `useEffect` es **automática** y está ligada al ciclo de vida del componente, disparándose sola en el mismo instante en que la pantalla se monta en el dispositivo.

---

## Qué he modificado

### Backend (NestJS)
- En [main.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-07/backend/src/main.ts):
  - Configuración de CORS con `app.enableCors()`.
- En [mensaje.controller.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-07/backend/src/mensaje/mensaje.controller.ts):
  - Endpoint `@Get()` que responde con `{ texto: 'Backend disponible' }`.
- En [app.module.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-07/backend/src/app.module.ts):
  - Registro de `MensajeController` en el módulo principal.

### Frontend (React Native con Expo)
- En [App.tsx](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-07/frontend/App.tsx):
  - Estado inicial `useState('Cargando…')`.
  - Disparo de `cargarMensaje()` dentro de `useEffect` con lista de dependencias vacía `[]`.
  - Inclusión del botón `<Button title="Recargar" onPress={cargarMensaje} />` para actualizaciones manuales.

---

## Resultado

### 1. Petición al Backend
**Petición**: `GET http://localhost:3000/mensaje`
- **Estado**: `200 OK`
- **Respuesta (JSON)**:
```json
{
  "texto": "Backend disponible"
}
```

### 2. Flujo en la Aplicación Móvil
1. **Al abrir la app**: Muestra brevemente `"Cargando…"`.
2. **Carga automática**: Al resolverse la petición en segundo plano, la pantalla muestra `"🟢 Backend disponible"`.
3. **Pulsar "Recargar"**: La app vuelve a solicitar el estado al backend y actualiza la vista.
