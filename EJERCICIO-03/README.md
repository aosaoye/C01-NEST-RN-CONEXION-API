# EJERCICIO 03 - Búsqueda por Parámetro Dinámico (@Param y find)

## Qué he aprendido
- **`@Param` y `find()`**:
  - Capturar variables dinámicas en la URL utilizando `@Get(':id')` y extrayéndolas en los argumentos del método con `@Param('id') id: string`.
  - Transformación de tipos de datos en la URL: dado que los parámetros de ruta viajan como texto (`string`), se convierte a número mediante el operador unario `+id` para coincidir con la firma del servicio.
  - Uso de métodos de arrays en JavaScript/TypeScript: emplear `find()` para localizar y retornar el primer elemento que cumpla con el predicado (`mascota.id === id`).
- **Cómo encaja en el recorrido Full Stack**:
  - Implementación del patrón **Master-Detail (Maestro-Detalle)**: en una aplicación móvil (React Native), el usuario selecciona una tarjeta de mascota de una lista general y la app navega a la pantalla de detalle consultando `GET /mascotas/:id` para obtener y pintar la información específica de esa mascota.
- **Cómo modificar un ejemplo funcional sin empezar desde cero**:
  - Extender la base Controller-Service para implementar endpoints de lectura puntual por identificador único.

---

## Respuesta a la pregunta de comprensión
> **¿Podrías explicar este ejercicio sin mirar el código?**

Este ejercicio implementa la búsqueda puntual de un recurso mediante un identificador dinámico. 

Podemos entenderlo con la metáfora del **archivo o casillero de un centro veterinario**:
1. **La Petición Dinámica:** El cliente (la app móvil o navegador) no pide ver a todos los animales, sino la ficha de uno concreto, indicando su número de chapa en la dirección web (por ejemplo: `GET /mascotas/2`).
2. **El Controlador (Recepción):** El controlador tiene una ventana configurada para leer ese número de chapa (`@Get(':id')` y `@Param('id')`). Extrae el número del texto de la URL, lo transforma a número y se lo entrega al servicio diciendo: *"Búscame la mascota con este ID"*.
3. **El Servicio (El Archivo Central):** El servicio revisa su lista de fichas en memoria con `find()`, comparando el identificador recibido con el de cada mascota hasta encontrar la coincidencia exacta.
4. **Respuesta:** El servicio entrega esa ficha única al controlador, y este la responde en formato JSON al cliente para que la app móvil pinte la pantalla de perfil de esa mascota.

---

## Qué he modificado
- En [mascotas.controller.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-03/backend/src/mascotas/mascotas.controller.ts):
  - Inyección del servicio `MascotasService` en el constructor.
  - Declaración de la ruta dinámica `@Get(':id')`.
  - Inclusión del método `findOne(@Param('id') id: string)` que convierte el `id` con `+id` y delega en el servicio.
- En [mascotas.service.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-03/backend/src/mascotas/mascotas.service.ts):
  - Creación del array en memoria `mascotas` con objetos que contienen `id`, `nombre`, `raza` y `edad`.
  - Implementación del método `findOne(id: number)` utilizando `this.mascotas.find(mascota => mascota.id === id)`.

---

## Resultado
Al realizar una petición `GET http://localhost:3000/mascotas/1`:
- **Estado**: `200 OK`
- **Respuesta (JSON)**:
```json
{
  "id": 1,
  "nombre": "Pelusa",
  "raza": "gato",
  "edad": 5
}
```

Al solicitar `GET http://localhost:3000/mascotas/2`:
```json
{
  "id": 2,
  "nombre": "Bobby",
  "raza": "perro",
  "edad": 3
}
```
Si el `id` no existe (por ejemplo `/mascotas/99`), `find()` retorna `undefined`, por lo que NestJS devuelve una respuesta vacía con código `200` (base lista para implementar manejo de errores con `NotFoundException` en retos posteriores).
