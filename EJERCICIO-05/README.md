# EJERCICIO 05 - Conexión Full Stack: React Native (Expo) y NestJS

## Qué he aprendido
- **Conexión Cliente-Servidor (React Native + NestJS)**:
  - Realizar peticiones HTTP asíncronas desde una aplicación móvil utilizando la función estándar `fetch()`.
  - Comprender el ciclo de vida de un componente funcional en React con el hook `useEffect`: ejecutar código automáticamente al montarse la vista mediante una lista de dependencias vacía `[]`.
  - Gestión del estado reactivo con `useState<string>('')` para almacenar datos provenientes de la red y refrescar automáticamente la interfaz de usuario al recibirlos.
- **Resolución dinámica de IP en redes locales (`expo-constants`)**:
  - Comprender por qué `http://localhost:3000` no sirve en dispositivos móviles reales ni emuladores (dado que `localhost` apunta al propio dispositivo y no a la máquina anfitriona donde corre NestJS).
  - Extraer dinámicamente la IP de la máquina de desarrollo en la red local utilizando `Constants.expoConfig?.hostUri?.split(':')[0]`, permitiendo que Expo Go conecte con el servidor sin necesidad de escribir IPs fijas (*hardcodeadas*).
- **Políticas de CORS (*Cross-Origin Resource Sharing*)**:
  - Habilitar `app.enableCors()` en el archivo `main.ts` de NestJS para evitar que las peticiones entre diferentes orígenes o puertos sean bloqueadas por los mecanismos de seguridad del navegador o de la capa de red.
- **Maquetación móvil segura**:
  - Uso de `SafeAreaView` para garantizar que el contenido respete los bordes de la pantalla, notches, barras de navegación e islas dinámicas tanto en iOS como en Android.
- **Cómo encaja en el recorrido Full Stack**:
  - Representa el **primer hito de integración completa**: pasamos de probar la API en herramientas aisladas (como el navegador o Postman) a conectar dos mundos independientes: un frontend móvil multiplataforma (React Native) y un backend estructurado (NestJS), estableciendo el flujo real de datos cliente-servidor.
- **Cómo modificar un ejemplo funcional sin empezar desde cero**:
  - Crear un endpoint específico en el backend (`GET /mensaje`) y transformar la plantilla base de Expo para que en lugar de mostrar textos estáticos, consulte la API y refleje el estado en tiempo real.

---

## Respuesta a la pregunta de comprensión
> **¿Podrías explicar este ejercicio sin mirar el código?**

Este ejercicio demuestra la primera comunicación bidireccional real entre una aplicación móvil y un servidor backend.

Podemos entenderlo con la metáfora de **una llamada telefónica entre un delegado móvil y la oficina central**:
1. **La Oficina Central (El Backend NestJS):** En la sede central (puerto `3000`), el servidor se enciende y crea un departamento de atención (`@Controller('mensaje')`). Además, retira cualquier filtro de entrada autorizando llamadas de fuera (`app.enableCors()`), con la instrucción de que cuando alguien pregunte a la línea `GET /mensaje`, se le responda con la señal de confirmación: `{"mensaje": "Conectado"}`.
2. **El Delegado Móvil (La App React Native con Expo):** En cuanto la aplicación móvil arranca y se dibuja en la pantalla del usuario (el hook `useEffect`), necesita confirmar si hay comunicación con la sede. 
3. **El Marcado Automático (`expo-constants` y `fetch`):** Como el móvil está en movimiento por la red Wi-Fi, no puede llamar a ciegas a *"sí mismo"* (`localhost`); consulta su agenda de configuración (`Constants.expoConfig.hostUri`) para obtener la dirección exacta de la máquina del desarrollador y marca la llamada HTTP: `http://<IP>:3000/mensaje`.
4. **La Recepción y la Pizarra (`useState`):** La oficina central responde inmediatamente con el JSON. El teléfono procesa los datos, escribe el texto en su memoria local (`useState`), y automáticamente la pantalla se actualiza en negrita diciendo: *"El mensaje de la API es: Conectado"*.

---

## Qué he modificado

### Backend (NestJS)
- En [main.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-05/backend/src/main.ts):
  - Invocación de `app.enableCors()` antes del inicio del servidor para habilitar el consumo de recursos entre distintos orígenes y dispositivos.
- En [mensaje.controller.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-05/backend/src/mensaje/mensaje.controller.ts):
  - Creación del controlador `MensajeController` bajo la ruta `/mensaje`.
  - Definición del método `saludos()` anotado con `@Get()` que responde con el objeto `{ mensaje: "Conectado" }`.
- En [app.module.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-05/backend/src/app.module.ts):
  - Inclusión de `MensajeController` en el arreglo de `controllers` del módulo raíz.

### Frontend (React Native con Expo)
- En [App.tsx](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-05/frontend/App.tsx):
  - Determinación dinámica de la IP de conexión mediante `Constants.expoConfig?.hostUri?.split(':')[0]`.
  - Definición del estado `mensaje` con `useState<string>('')`.
  - Implementación de la función asíncrona `cargarMensaje()` utilizando `fetch(API_URL + '/mensaje')` con captura de excepciones (`try/catch`).
  - Disparo automático de la petición en el montaje de la vista mediante `useEffect`.
  - Renderizado centrado utilizando componentes nativos de React Native (`SafeAreaView`, `View`, `Text` y `StatusBar`) asegurando el correcto soporte multiplataforma.
- En [package.json](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-05/frontend/package.json):
  - Instalación y configuración limpia de `expo-constants` y eliminación de dependencias redundantes.

---

## Resultado

### 1. Petición al Backend
**Petición**: `GET http://localhost:3000/mensaje` (o `http://<IP_LOCAL>:3000/mensaje`)
- **Estado**: `200 OK`
- **Respuesta (JSON)**:
```json
{
  "mensaje": "Conectado"
}
```

### 2. Renderizado en React Native (Expo Go / Emulador)
- La aplicación móvil inicia mostrando un contenedor con fondo blanco centrado en pantalla dentro del área segura (`SafeAreaView`).
- Se realiza la petición en segundo plano al montar el componente.
- Al resolverse la promesa, la interfaz se refresca automáticamente:
  - **Título**: `"El mensaje de la API es:"` (texto descriptivo en gris)
  - **Valor**: `"Conectado"` (texto destacado en negrita y tamaño mayor)
