# EJERCICIO 10 - Likes (Modificación Parcial con PATCH)

## Qué he aprendido
- **El método HTTP PATCH para modificaciones parciales**:
  - Distinción entre los verbos HTTP: mientras `GET` recupera información sin alterar el servidor y `POST` se orienta a la creación de un nuevo recurso completo, `PATCH` expresa la intención de actualizar parcialmente un recurso existente (en este caso, incrementar la propiedad `likes`).
  - Utilización del decorador `@Patch(':id/like')` en NestJS para definir el endpoint de acción.
- **Mutación del estado en el Service (Capa de lógica)**:
  - Recuperación de la entidad a modificar mediante `this.mascotas.find()`.
  - Incremento atómico del contador en memoria: `mascota.likes++`.
  - Retorno del objeto mutado para que el cliente disponga inmediatamente del nuevo estado del servidor sin requerir una segunda llamada de sincronización.
- **Consumo de endpoints PATCH desde React Native**:
  - Configuración de opciones en la llamada fetch: `fetch(API_URL + '/mascotas/1/like', { method: 'PATCH' })`.
  - Actualización inmediata del estado local (`setLikes(mascota.likes)`) reflejando el nuevo valor devuelto por la API.
  - Gestión de feedback de interacción durante la petición asíncrona.
- **Cómo encaja en el recorrido Full Stack**:
  - Completa el ciclo de escritura ligera: la acción del usuario en la pantalla táctil (`onPress`) viaja como petición de mutación HTTP a través de la red, el controlador enruta hacia el servicio, el servicio modifica los datos en memoria y la respuesta actualizada viaja de vuelta como JSON para re-renderizar la vista.

---

## Respuesta a la pregunta de comprensión
> **¿Por qué los likes vuelven al valor inicial cuando reiniciamos NestJS?**
>
> Los likes vuelven a su valor inicial (14) porque la colección de mascotas está almacenada exclusivamente en la **memoria RAM volátil** del proceso NodeJS/NestJS (`private mascotas = [...]`).
> 
> Mientras el servidor está en ejecución, cualquier mutación (`mascota.likes++`) altera la referencia en dicha memoria. Sin embargo, al reiniciar NestJS (o al recompilar el proyecto tras guardar cambios con `start:dev`), el proceso se termina y se destruye el espacio de memoria asignado. Cuando el servidor vuelve a arrancar, la clase `MascotasService` se instancia desde cero y su propiedad privada `mascotas` se inicializa de nuevo con los valores hardcodeados en el código fuente.
>
> En una aplicación de producción, el `Service` delegaría la persistencia en un repositorio conectado a una **base de datos permanente** (PostgreSQL, MySQL, SQLite, MongoDB), de modo que los likes persistirían independientemente de cuántas veces se reinicie el backend.

---

> **¿Podrías explicar este ejercicio sin mirar el código?**
>
> Imagina un **marcador digital en un refugio de animales**:
> 1. **La Pantalla Móvil:** La aplicación muestra la foto y ficha del perro *Toby* indicando que tiene 14 corazones. Hay un botón que dice *"❤️ Me gusta"*.
> 2. **El Toque del Usuario:** El usuario pulsa el botón. El teléfono envía un paquete por la red que dice: *"Por favor, añade un like al animal número 1"* (`PATCH /mascotas/1/like`).
> 3. **La Ventanilla de NestJS (`@Patch`):** En el servidor, el controlador tiene una ventanilla específica para peticiones de tipo `PATCH` dirigidas a `:id/like`. Recibe la petición y avisa al encargado de la pizarra (el Servicio).
> 4. **La Mutación en la Pizarra (Service):** El servicio busca a *Toby* en su lista en memoria, borra el 14 y escribe un 15. Inmediatamente responde al teléfono entregándole la ficha actualizada con el número 15.
> 5. **Actualización Reactiva:** El teléfono recibe la respuesta, sustituye el 14 por el 15 en pantalla y el usuario ve reflejado su like al instante.
> 6. **Reinicio del Servidor:** Si el servidor se apaga o reinicia, la pizarra en memoria se borra y al encenderse vuelve a dibujarse la pizarra por defecto con 14 likes.

---

## Qué he modificado

### Backend (NestJS)
- En [main.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-10/backend/src/main.ts):
  - Habilitación de CORS con `app.enableCors()` para permitir peticiones `PATCH` desde el cliente móvil.
- En [mascotas.service.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-10/backend/src/mascotas/mascotas.service.ts):
  - Definición del tipo `Mascota` con `id`, `nombre` y `likes`.
  - Array en memoria con el registro inicial `{ id: 1, nombre: 'Toby', likes: 14 }`.
  - Método `darLike(id: number)` que localiza a la mascota, incrementa `likes++` y retorna el objeto modificado.
- En [mascotas.controller.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-10/backend/src/mascotas/mascotas.controller.ts):
  - Endpoint `@Get()` y `@Get(':id')` para inspección y consulta.
  - Endpoint `@Patch(':id/like')` que captura el parámetro con `@Param('id')` y ejecuta `this.mascotasService.darLike()`.
  - Lanzamiento de `NotFoundException` en caso de ID inexistente.
- En [mascotas.module.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-10/backend/src/mascotas/mascotas.module.ts) y [app.module.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-10/backend/src/app.module.ts):
  - Declaración y registro modular del recurso `mascotas`.

### Frontend (React Native con Expo)
- En [App.tsx](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-10/frontend/App.tsx):
  - Configuración de la constante `API_URL = 'http://10.119.79.225:3000'`.
  - Estado `likes` inicializado y sincronizado con el backend mediante `cargarMascota()` al montar el componente (`useEffect`).
  - Función asíncrona `darLike()` que emite la petición `PATCH` a `/mascotas/1/like`.
  - Renderizado de la tarjeta con el emoji 🐶, nombre, contador dinámico `❤️ {likes} likes` y botón interactivo *"❤️ Me gusta"*.
  - Manejo de estados de carga (`ActivityIndicator`) y feedback de error.

---

## Resultado

### 1. Comprobación de Endpoints (Backend)
```bash
# Consulta inicial
curl -X GET http://localhost:3000/mascotas/1
# Respuesta: {"id":1,"nombre":"Toby","likes":14}

# Petición PATCH para incrementar like
curl -X PATCH http://localhost:3000/mascotas/1/like
# Respuesta: {"id":1,"nombre":"Toby","likes":15}

# Segunda petición PATCH
curl -X PATCH http://localhost:3000/mascotas/1/like
# Respuesta: {"id":1,"nombre":"Toby","likes":16}
```

### 2. Comportamiento en la App Móvil
```
┌────────────────────────────────┐
│                                │
│              🐶                │
│             Toby               │
│                                │
│         ❤️ 15 likes            │
│                                │
│      [ ❤️ Me gusta ]           │
│                                │
└────────────────────────────────┘
```
Al presionar el botón en la app móvil:
1. Se envía `PATCH http://10.119.79.225:3000/mascotas/1/like`.
2. NestJS incrementa el valor en memoria y devuelve el objeto JSON actualizado.
3. La interfaz se redibuja automáticamente pasando de 14 a 15, luego a 16, etc.
