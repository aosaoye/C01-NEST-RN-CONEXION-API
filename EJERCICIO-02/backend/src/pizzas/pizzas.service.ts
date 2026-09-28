import { Injectable } from '@nestjs/common';

@Injectable()
export class PizzasService {
    private readonly PIZZAS = [
        {
            id: 1,
            nombre: 'Margarita',
            ingredientes: ['Salsa de tomate', 'Queso mozzarella', 'Albahaca'],
            precio: 10,
        },
        {
            id: 2,
            nombre: 'Pepperoni',
            ingredientes: ['Salsa de tomate', 'Queso mozzarella', 'Pepperoni'],
            precio: 12,
        },
        {
            id: 3,
            nombre: 'Cuatro quesos',
            ingredientes: ['Salsa de tomate', 'Queso mozzarella', 'Queso parmesano', 'Queso azul'],
            precio: 14,
            emoji: '🧀'
        }
    ];

    findAll() {
        return this.PIZZAS;
    }

}
