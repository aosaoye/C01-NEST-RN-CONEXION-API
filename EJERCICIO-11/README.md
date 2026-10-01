# EJERCICIO 11 - Mini Tienda (Creación con POST y @Body)

## Qué he aprendido
- **El método HTTP POST y el cuerpo de la petición (Request Body)**:
  - Comprensión del verbo `POST` como la operación canónica para enviar información destinada a crear un nuevo recurso en el servidor.
  - La necesidad de empaquetar datos complejos dentro del cuerpo de la petición (`body`) en contraposición a los parámetros en la URL (`@Param` o `@Query`).
- **El decorador `@Body()` en NestJS**:
  - Cómo NestJS abstrae la deserialización del payload JSON entrante inyectándolo automáticamente en el argumento del controlador: `@Body() producto: { nombre: string; precio: number }`.
  - Validación de la estructura y de los tipos de datos recibidos antes de transferirlos a la capa lógica.
- **Construcción y envío de payloads JSON desde React Native**:
  - Uso de `JSON.stringify({ nombre, precio: Number(precio) })` para serializar objetos de JavaScript en texto plano transferible por HTTP.
  - Configuración indispensable de los headers de la petición: `'Content-Type': 'application/json'`.
- **Integración del ciclo completo de creación y refresco**:
  - Tras resolver con éxito la promesa del `POST`, limpieza de los campos de texto (`setNombre('')`, `setPrecio('')`) y re-ejecución inmediata de `cargarProductos()` para que la `FlatList` renderice el nuevo producto en pantalla.

---

## Respuesta a la pregunta de comprensión
> **¿Qué recorrido realiza el objeto hasta llegar a `@Body()`?**
>
> El recorrido que realiza el dato nuevo desde que el usuario lo teclea hasta que es procesado en NestJS consta de las siguientes etapas:
> 1. **Entrada de usuario y estado (React Native):** El usuario teclea en los inputs de la aplicación; los callbacks `onChangeText` actualizan los estados locales de React (`nombre` y `precio`).
> 2. **Serialización (Cliente):** Al presionar *"Añadir producto"*, se crea un objeto de JavaScript y se convierte en una cadena de caracteres en formato JSON mediante `JSON.stringify({ nombre, precio: Number(precio) })`.
> 3. **Definición de cabeceras HTTP:** Se adjunta el encabezado `'Content-Type': 'application/json'`, indicándole al servidor que el cuerpo de la petición contiene un documento JSON.
> 4. **Tránsito de red:** La petición viaja como un mensaje HTTP con método `POST` dirigido a la URL `http://<IP>:3000/productos`.
> 5. **Recepción y parseo (Express / NestJS):** El servidor HTTP subyacente (Express) intercepta los bytes entrantes. Su middleware de análisis de JSON (`body-parser`) decodifica el stream de datos y reconstruye un objeto nativo de JavaScript en la propiedad `req.body`.
> 6. **Inyección en el Controlador (`@Body`):** El motor de reflexión y enrutamiento de NestJS identifica el decorador `@Body()` en el método `crear()` del `ProductosController`, extrayendo el contenido de `req.body` y suministrándolo como el argumento `producto`.
> 7. **Lógica de negocio (Service):** El controlador invoca `this.productosService.crear(producto)`, donde se calcula el nuevo `id` (`this.productos.length + 1`), se agrega al array y se retorna como confirmación.

---

> **¿Podrías explicar este ejercicio sin mirar el código?**
>
> Piensa en **la gestión de pedidos en una tienda**:
> 1. **La Hoja de Entrada (Frontend):** En el móvil disponemos de un formulario donde escribimos el nombre del artículo ("Mochila") y su precio ("35").
> 2. **El Envío del Paquete:** Al pulsar *"Añadir producto"*, la app introduce la información en un paquete cerrado herméticamente, le coloca una pegatina que dice *"Formato: JSON"* y lo envía por mensajería a la central (`POST /productos`).
> 3. **La Ventanilla de Recepción (`@Post` y `@Body`):** En la central (NestJS), el controlador dispone de una ventanilla de entrada exclusiva para nuevos productos (`@Post`). El encargado abre el paquete, comprueba la etiqueta y extrae la ficha del producto directamente (`@Body`).
> 4. **El Registro en el Libro Mayor (Service):** El encargado le pasa la ficha al responsable del inventario (el Servicio). Éste comprueba el número de artículos registrados, le asigna el siguiente identificador correlativo (`id = 3`), lo guarda en la lista y sella la copia con la confirmación.
> 5. **El Escaparate Actualizado:** El teléfono móvil recibe la copia sellada, vacía las casillas de texto para el siguiente producto y vuelve a solicitar el inventario completo para colocar el nuevo artículo en el escaparate digital (`FlatList`).

---

## Qué he modificado

### Backend (NestJS)
- En [main.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-11/backend/src/main.ts):
  - Habilitación de CORS mediante `app.enableCors()`.
- En [productos.service.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-11/backend/src/productos/productos.service.ts):
  - Definición de tipos `Producto` y `NuevoProducto`.
  - Array inicial con dos productos predefinidos: Mochila (35 €) y Auriculares (49 €).
  - Método `findAll()` para listar el catálogo.
  - Método `crear(producto: NuevoProducto)` que autoincrementa el `id`, añade el objeto a la colección en memoria y retorna el producto creado.
- En [productos.controller.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-11/backend/src/productos/productos.controller.ts):
  - Endpoint `@Get()` para obtener el listado completo.
  - Endpoint `@Post()` con el decorador `@Body()` para recibir la carga útil y validación básica de campos requeridos (`BadRequestException`).
- En [app.module.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-11/backend/src/app.module.ts):
  - Registro de `ProductosController` y `ProductosService`.

### Frontend (React Native con Expo)
- En [App.tsx](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-11/frontend/App.tsx):
  - Formulario con dos componentes `<TextInput>` para nombre y precio (con `keyboardType="numeric"`).
  - Validaciones locales antes de enviar la petición (campos vacíos y valores numéricos positivos).
  - Llamada HTTP con `method: 'POST'`, header `'Content-Type': 'application/json'` y body serializado con `JSON.stringify()`.
  - Renderizado de la lista reactiva de productos mediante `<FlatList>` mostrando el nombre, identificador y precio en euros.
  - Gestión de estados de carga (`cargando`, `guardando`) y tratamiento de errores de comunicación.

---

## Resultado

### 1. Comprobación de Endpoints con cURL
```bash
# 1. Consulta inicial del catálogo (GET)
curl -X GET http://localhost:3000/productos
# Respuesta: [{"id":1,"nombre":"Mochila","precio":35},{"id":2,"nombre":"Auriculares","precio":49}]

# 2. Creación de un nuevo producto (POST con Body JSON)
curl -X POST http://localhost:3000/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Teclado Mecánico","precio":75}'
# Respuesta: {"id":3,"nombre":"Teclado Mecánico","precio":75}

# 3. Verificación de catálogo actualizado (GET)
curl -X GET http://localhost:3000/productos
# Respuesta: [{"id":1,"nombre":"Mochila","precio":35},{"id":2,"nombre":"Auriculares","precio":49},{"id":3,"nombre":"Teclado Mecánico","precio":75}]
```

### 2. Comportamiento en la Aplicación Móvil
```
┌──────────────────────────────────────────┐
│  🛒 Mini tienda                          │
│                                          │
│  ┌─ Nuevo Producto ────────────────────┐ │
│  │ [ Nombre del producto             ] │ │
│  │ [ Precio en €                     ] │ │
│  │ [        Añadir producto          ] │ │
│  └─────────────────────────────────────┘ │
│                                          │
│  Catálogo disponible                     │
│  ┌─────────────────────────────────────┐ │
│  │ Mochila                     35 €    │ │
│  │ ID #1                               │ │
│  ├─────────────────────────────────────┤ │
│  │ Auriculares                 49 €    │ │
│  │ ID #2                               │ │
│  ├─────────────────────────────────────┤ │
│  │ Teclado Mecánico            75 €    │ │
│  │ ID #3                               │ │
│  └─────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```
Al rellenar el formulario y hacer clic en *"Añadir producto"*:
1. React Native valida los datos y envía la petición `POST /productos` con el JSON en el cuerpo.
2. NestJS recibe los datos en `@Body()`, crea el producto con `id = 3` y lo guarda en el array.
3. El frontend limpia los inputs y recarga la lista, visualizándose inmediatamente en el catálogo.
