# EJERCICIO 01 - Primer Endpoint en NestJS

## Qué he aprendido
- **`@Controller` y `@Get`**: Comprender el rol de los decoradores de NestJS para definir rutas y gestionar métodos HTTP.
- **Cómo encaja en el recorrido Full Stack**: El backend expone un punto de entrada (endpoint) HTTP que cualquier cliente (React Native, web, Postman) puede consumir enviando una solicitud y recibiendo una respuesta plana.
- **Cómo modificar un ejemplo funcional sin empezar desde cero**: Aprovechar el scaffolding base generado por NestJS para añadir nuevos controladores y endpoints limpios.

---

## Respuesta a la pregunta de comprensión
> **¿Podrías explicar este ejercicio sin mirar el código?**

Este ejercicio consiste en crear un endpoint de saludo básico. El **Controlador** actúa como la puerta de entrada o recepcionista en la ruta `/hola`. Cuando cualquier cliente (navegador o app móvil) envía una petición `GET` a esa dirección, el controlador captura la solicitud y responde directamente con el mensaje `"Curso DAM"`. 

En la arquitectura Full Stack representa la comunicación mínima viable: el cliente pide un recurso y el servidor responde sin necesidad de procesar lógica pesada ni consultar bases de datos.

---

## Qué he modificado
- Se generó el controlador `HolaController` con `@Controller('hola')`.
- Se definió el endpoint raíz del controlador con `@Get('/')` y el método `saludar()`.
- Se configuró para que retorne la cadena de texto `"Curso DAM"`.
- Se registró automáticamente el controlador en [app.module.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-01/backend/src/app.module.ts).

---

## Resultado
Al iniciar el servidor en modo desarrollo (`pnpm run start:dev`) y consultar `http://localhost:3000/hola`:
- **Método HTTP**: `GET`
- **Ruta**: `/hola`
- **Respuesta**: `"Curso DAM"`
