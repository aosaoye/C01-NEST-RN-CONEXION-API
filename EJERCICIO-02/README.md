# EJERCICIO 02 - Separación de Responsabilidades: Controller y Service

## Qué he aprendido
- **`Service` y `array`**: Aprender a separar la lógica de datos y negocio del controlador utilizando clases proveedoras marcadas con `@Injectable()` y almacenando colecciones en memoria mediante arrays tipados.
- **Inyección de dependencias**: Inyectar el servicio en el constructor del controlador (`constructor(private readonly pizzasService: PizzasService)`).
- **Cómo encaja en el recorrido Full Stack**: El cliente solicita datos estructurados a la API (`GET /pizzas`). El servidor responde con un arreglo JSON de objetos que el frontend (React Native) puede transformar en componentes visuales (como una lista de tarjetas de productos con imagen/emoji, precio y detalle).
- **Cómo modificar un ejemplo funcional sin empezar desde cero**: Añadir nuevos elementos y propiedades (como `emoji: '🧀'`) a estructuras de datos existentes sin romper el contrato del endpoint.

---

## Respuesta a la pregunta de comprensión
> **¿Podrías explicar este ejercicio sin mirar el código?**

Este ejercicio implementa una arquitectura por capas básica: **Controlador + Servicio**.

Podemos entenderlo con la metáfora de un restaurante:
1. El **Controlador** es el camarero. Su único trabajo es atender al cliente, recibir la comanda cuando piden la carta de pizzas (`GET /pizzas`) y devolverles el plato.
2. El **Servicio** es la cocina. Es donde residen los datos y la preparación de las pizzas (el array con ingredientes, precios y emojis). 
3. El camarero no cocina ni almacena los ingredientes directamente; se los solicita al servicio (`pizzasService.findAll()`) y se los entrega al cliente en formato JSON listo para ser consumido.

Esto permite que la aplicación sea modular, mantenible y escalable.

---

## Qué he modificado
- Se generaron el controlador y el servicio para el recurso `pizzas` mediante Nest CLI.
- En [pizzas.service.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-02/backend/src/pizzas/pizzas.service.ts):
  - Se definió el array privado `PIZZAS` con 3 pizzas (`Margarita`, `Pepperoni` y `Cuatro quesos` con emoji `🧀`).
  - Se implementó el método `findAll()` que retorna la lista completa.
- En [pizzas.controller.ts](file:///c:/Users/kali/Documents/FullStackChallenges/C01-NEST-RN-CONEXION-API/EJERCICIO-02/backend/src/pizzas/pizzas.controller.ts):
  - Se inyectó `PizzasService` en el constructor.
  - Se mapeó el endpoint `@Get()` hacia `this.pizzasService.findAll()`.

---

## Resultado
Al consultar `GET http://localhost:3000/pizzas`:
- **Estado**: `200 OK`
- **Respuesta (JSON)**:
```json
[
  {
    "id": 1,
    "nombre": "Margarita",
    "ingredientes": ["Salsa de tomate", "Queso mozzarella", "Albahaca"],
    "precio": 10
  },
  {
    "id": 2,
    "nombre": "Pepperoni",
    "ingredientes": ["Salsa de tomate", "Queso mozzarella", "Pepperoni"],
    "precio": 12
  },
  {
    "id": 3,
    "nombre": "Cuatro quesos",
    "ingredientes": ["Salsa de tomate", "Queso mozzarella", "Queso parmesano", "Queso azul"],
    "precio": 14,
    "emoji": "🧀"
  }
]
```
